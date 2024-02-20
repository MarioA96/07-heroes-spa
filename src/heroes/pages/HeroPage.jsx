import { useMemo } from "react";

import { Navigate, useNavigate, useParams } from "react-router-dom";

import { getHeroById } from "../helpers";

export const HeroPage = () => {

    const { id, ...rest } = useParams();
    const navigate = useNavigate();

    const hero = useMemo( () => getHeroById( id ), [ id ] );

    const onNavigateBack = () => {
        navigate( -1 );
        // if ( rest.length <= 1 ) {
        //     return <Navigate to="/" />
        // } else {
        //     return <Navigate to="/search" />
        // }
    };

    if ( !hero ) {
        return <Navigate to="/" />
    }


    return (
        <div className="row mt-5">
            <div className="col-4">
                <img 
                    src={ `/assets/heroes/${ id }.jpg` }
                    alt={ hero.superhero }
                    className="img-thumbnail animate__animated animate__fadeInLeft"
                />
            </div>

            <div className="col-8">
                <h3>{ hero.superhero }</h3>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item"><b>Alter ego:</b> { hero.alter_ego }</li>
                    <li className="list-group-item"><b>Publisher:</b> { hero.publisher }</li>
                    <li className="list-group-item"><b>First appearance:</b> { hero.first_appearance }</li>
                </ul>

                <h4 className="mt-3"> Characters </h4>
                <p>{ hero.characters }</p>

                <button 
                    className="btn btn-outline-primary"
                    onClick={ onNavigateBack }
                >
                    Retroceder
                </button>
            </div>
        </div>
    )
};