import { Routes, Route } from 'react-router-dom';

import { HeroesRoutes } from '../heroes';
import { LoginPage } from '../auth';

import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';


export const AppRouter = () => {
    return (
        <>
            <Routes>
                <Route path='login/*' element={
                    <PublicRoute>
                        {/* <LoginPage /> */}
                        {/* Realmente es lo mismo, pero esta es otra alternativa */}
                        <Routes>
                            <Route path='/*' element={<LoginPage />} />
                        </Routes>
                    </PublicRoute>
                } />

                <Route path='/*' element={
                    <PrivateRoute>
                        <HeroesRoutes />
                    </PrivateRoute>
                }/>

                {/* <Route path='/*' element={<HeroesRoutes />} /> */}
            </Routes>
        </>
    )
};
