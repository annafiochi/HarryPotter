"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import styles from './characterList.module.css';


const CharacterList = () => {
    const url = "https://hp-api.onrender.com/api/characters";


    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                setLoading(true);
                const response = await axios.get(url);
                setCharacters(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Erro ao buscar os Characteres na API");
                setError("não foi possível carregar os Characteres. tente novamente mais tarde.");
                setLoading(false);
            }
        };
        fetchCharacters();
    }, []);

    if (loading) {
        return (
            <div className={styles.loading}>
                Carregando Characteres...
            </div>
        )
    }

    if (error) {
        return (
            <div className={styles.error}>
                {error}
            </div>
        )
    }



    return (
        <div className={styles.container}>
            <h1 className={styles.nameTop}>Characteres de Harry Potter
            </h1>
            <div className={styles.CharacterGrid}>
                {characters.map((Character) => (
                    <div key={Character.id} className={styles.CharacterCard}>
                        <div className={styles.imageContainer}>
                            <img src={Character.image} alt={Character.name} className={styles.image} />
                        </div>
                        <div className={styles.content}>
                            <p className={styles.name}>Name: {Character.name}</p>
                            <p className={styles.hairColour}>HairColour:{Character.hairColour}</p>
                            <p className={styles.species}>species:{Character.species}</p>
                            <div className={styles.rating}>
                                <span className={styles.score}>{Character.rt_score}%</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CharacterList;