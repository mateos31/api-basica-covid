import React, { useState } from 'react';
import axios from 'axios';
import styles from '../styles.module.css';

function Home() {
    const [text, setText] = useState();     //Variáveis utilizadas para "controlar o campo de input"
    const [covid, setCovid] = useState();

    //função responsável por enviar o texto para a API e tratar a resposta
    let getCovid = async (country) => {
        let response = await axios.get(`http://localhost:4567/${country}`);
        setCovid(response.data)
        console.log(response.data)
    }

    //Função que pega o texto e atualiza seu valor
    //Essa função é chamada ao enviar o formuláro. Atentar para a estrutura do formulário e como os atributos são manipulados
    function handleSubmit(event) {
        event.preventDefault();
        getCovid(text);
    }

    if (covid == undefined) {
        return (
            <div className={styles.container}>
                <div className={styles.header}>
                    <h3>Covid Api</h3>
                    <p>Para mais informações informe seu páis</p>


                    <form onSubmit={handleSubmit}>
                        <input value={text} onChange={(e) => setText(e.target.value)} />
                        <input type="submit" value="Enviar" />
                    </form>


                </div>
            </div>

        )
    } else {
        return (
            <div className={styles.container}>
                <div className={styles.header}>
                    <h3>Covid Api</h3>
                    <p>Para mais informações informe seu páis</p>
                    <form onSubmit={handleSubmit}>
                        <input value={text} onChange={(e) => setText(e.target.value)} />
                        <input type="submit" value="Enviar" />
                    </form>
                </div>
                <div className={styles.content}>
                    <div className={styles.countryInfo}>
                        <img src={covid.countryInfo.flag} alt="Country Flag" height="100" width="150" />
                        <h2 className={styles.country}>{covid.country}</h2>
                    </div>
                    <li>Total cases: {covid.cases}</li>
                    <li>Today cases: {covid.todayCases}</li>
                    <li>Total deaths: {covid.deaths}</li>
                    <li>Today deaths: {covid.todayDeaths}</li>
                </div>
            </div>

        )
    }
}

export default Home;