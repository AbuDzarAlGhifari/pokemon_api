import React from "react";
const Card = ({ pokemon, loading,infoPokemon}) => {
//    console.log(pokemon);
    return (
        <>
        {
            loading ? <h1>Loading...</h1> :
                pokemon.map((item) => {
                    return (
                    <div className=" mt-5 m-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg" key={item.id} onClick={()=>infoPokemon(item)} >
                        <img className="img-card" src={item.sprites.front_default} alt="poke" />
                    <div className="p-1">
                        <h6 className=" font-bold text-s tracking-tight text-black text-center">{item.name}</h6>
                    </div>
                </div>
                    )
                })
        }

        </>
    )
}
export default Card;

