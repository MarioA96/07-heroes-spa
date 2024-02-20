import { useMemo } from "react";

import { HeroCard } from "./";

import { getHeroesByPublisher } from "../helpers";

export const HeroesList = ( {publisher} ) => {

    const heroes = useMemo( () => getHeroesByPublisher(publisher), [publisher] );

    return (
        <div className="row row-cols-1 row-cols-md-3 g-3">
            {
                heroes.map(hero => (
                    <HeroCard 
                        key={ hero.id }
                        { ...hero } // Spread operator to send all the properties of the hero
                    />
                ))
            }
        </div>
    )
};

