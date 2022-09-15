import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ScrollToTop from '../sharedComponents/generic/ScrollToTop';

// layout import
import ProtectedLayout from './ProtectedLayout';
import UnprotectedLayout from './UnprotectedLayout';

// pages import
import LoginPage from '../components/LoginPage';
import LandingPage from '../components/LandingPage';
import ApplicationLayout from '../components/ApplicationLayout';
import ApplicationPreview from '../components/ApplicationPreview';
import PageNotFound from '../components/PageNotFound';

export default function RoutesComp() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Unprotected routes */}
        <Route element={<UnprotectedLayout />}>
          <Route path="/" element={<LoginPage />} />
        </Route>

        {/* Protected routes */}
        <Route element={<ProtectedLayout />}>
          <Route path="/home" element={<LandingPage />} />
          <Route
            path="/application/:app_uuid"
            element={<ApplicationLayout />}
          />
          <Route
            path="/preview/:app_uuid/:view_uuid"
            element={<ApplicationPreview />}
          />
        </Route>

        {/* Page not found */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
