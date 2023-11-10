import { ChangeEvent, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import '../App.css'

const Main = () => {
    const [docs, setDocs] = useState([])

    const [isFirstLoading, setIsFirstLoading] = useState(false)

    const fetchDocIds = async () => {
        setIsFirstLoading(true)
        const response = await fetch(window.location.origin + '/luckysheet/api/getAll')
        const data = await response.json()
        setDocs(data)
        setIsFirstLoading(false)
    }

    useEffect(() => {
        fetchDocIds()
    }, [])

    const navigate = useNavigate()

    const importExcel = async (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        try {
            let formData = new FormData();
            formData.append("file", e.target.files[0]);

            const response = await fetch(window.location.origin + '/luckysheet/test/import_excel',
                {
                    method: "POST",
                    body: formData
                }
            )
            const data = await response.json()
            navigate(`/${data.data.docCode}`)
        } catch(e) {
            alert('Ошибка!')
        }
    }

    const createDoc = async () => {
        try {
            const response = await fetch(window.location.origin + '/luckysheet/api/createDoc')
            const data = await response.json()
            navigate(`/${data}`)
        } catch(e) {
            alert('Ошибка!')
        }
    }

    if (isFirstLoading) return <div className="main">Загрузка</div>

    return (
        <div className='main'>
            <div className="btns">
                <button onClick={() => createDoc()}>Создать документ</button>
                <div>Импорт excel <input type="file" onChange={(e) => importExcel(e)}/></div>
            </div>
            {!docs.length && <div>Нет созданных документов</div>}

            {docs.map((item, index) => 
                <div className="docItem" key={index}>
                    <Link to={`/${item}`}>Документ {index + 1}</Link>      
                </div>
            )}
        </div>
    )
}

export default Main