import React, { useEffect, useState } from "react";
import LuckyExcel from "luckyexcel";
import {useParams} from 'react-router-dom';

const luckysheet = window.luckysheet;
function LuckySheet() {

  const {id} = useParams()

  const options = {
    container: "luckysheet",
    allowUpdate: true,
    updateImageUrl: window.location.origin + "/luckysheet/api/updateImg",
    updateUrl: "ws://" + window.location.host + "/luckysheet/websocket/luckysheet",
    gridKey: id,
    loadUrl: window.location.origin + "/luckysheet/api/load",
    loadSheetUrl: window.location.origin + "/luckysheet/api/loadsheet",
    plugins: ["chart"],
    showinfobar: false,
  };

  useEffect(() => {
    luckysheet.create(options);  
  }, []);

  const [fileName, setFileName] = useState('')
  const [fileType, setFileType] = useState('xls')

  const downloadUrl = window.location.origin + `/luckysheet/test/down?listId=${id}&fileName=${fileName}.${fileType}`

  const luckyCss = {
    margin: "0px",
    padding: "0px",
    position: "absolute",
    width: "100%",
    height: "100%",
    left: "0px",
    top: "50px",
  };
  return (
    <div>
      {/* <input
        type={"file"}
        onChange={(event) => {
          const files = event.target.files;
          LuckyExcel.transformExcelToLucky(
            files[0],
            function (exportJson, luckysheetfile) {
              if (exportJson.sheets == null || exportJson.sheets.length === 0) {
                alert(
                  "Failed to read the content of the excel file, currently does not support xls files!"
                );
                return;
              }
              luckysheet.destroy();
              console.log(exportJson)
              luckysheet.create({
                container: "luckysheet",
                allowUpdate: true,
                updateImageUrl: window.location.origin + "/luckysheet/api/updateImg",
                updateUrl: "ws://" + window.location.host + "/luckysheet/websocket/luckysheet",
                data: exportJson.sheets,
                title: exportJson.info.name,
                userInfo: exportJson.info.name.creator,
              });
            }
          );
        }}
      /> */}
      <div className="export">
        <input type="text" value={fileName} onChange={(e) => setFileName(e.target.value)} />
        <span>
          <input type="radio" name="radio" value="xls"
          checked={fileType == 'xls' ? true : false}
          onChange={(e) => setFileType(e.target.value)} />
          xls
        </span>

        <span>
          <input type="radio" name="radio" value="xlsx"
          checked={fileType == 'xlsx' ? true : false}
          onChange={(e) => setFileType(e.target.value)} />
          xlsx
        </span>

        <button disabled={!fileName.length}>
          <a className={!fileName.length ? 'disabled' : 'enabled'} href={downloadUrl} download>Скачать</a>
        </button>
      </div>
      
      <div id="luckysheet" style={luckyCss} />
    </div>
  );
}

export default LuckySheet;
