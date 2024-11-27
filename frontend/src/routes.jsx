import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import NotFoundPage from './pages/NotFoundPage';
import InvalidTokenPage from './pages/InvalidTokenPage';

const AppRoutes = () => {
    return (
        <Suspense fallback={<div>Carregando...</div>}>
            <Routes>
                <Route exact path="/invalid-token" element={<InvalidTokenPage />} />
                <Route exact path="*" element={<NotFoundPage />} />
            </Routes>
        </Suspense>
    );
};

export default AppRoutes;
