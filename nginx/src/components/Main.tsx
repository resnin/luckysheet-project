import { ChangeEvent, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import '../App.css'

const Main = () => {
    const [docs, setDocs] = useState([])

    const [isLoading, setIsLoading] = useState(false)

    const fetchDocIds = async () => {
        setIsLoading(true)
        const response = await fetch(window.location.origin + '/luckysheet/api/getAll')
        const data = await response.json()
        setDocs(data)
        setIsLoading(false)
    }

    useEffect(() => {
        fetchDocIds()
    }, [])

    const navigate = useNavigate()

    const importExcel = async (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        try {
            setIsLoading(true)
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
            setIsLoading(false)
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

    if (isLoading) return <div className="main">Загрузка</div>

    return (
        <div className='main'>
            <div className="btns">
                <button onClick={() => createDoc()}>Создать документ</button>
                <div>Импорт excel <input type="file" onChange={(e) => importExcel(e)}/></div>
            </div>
            {!docs.length && <div>Нет созданных документов</div>}

            {docs.sort().map((item, index) => 
                <div className="docItem" key={index}>
                    <Link to={`/${item}`}>Документ {index + 1}</Link>      
                </div>
            )}
        </div>
    )
}

export default Main