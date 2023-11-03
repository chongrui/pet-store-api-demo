import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./utilities/hooks/useAuth";
import { Spinner } from "@material-tailwind/react";
import SideBar from "./components/SideBar/SideBar";
import NavBar from "./components/NavBar/NavBar";
import Login from "./pages/Login/Login";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

const PetsPage = lazy(() => import('./pages/Pets/Pets'));
const OrdersPage = lazy(() => import('./pages/Orders/Orders'));

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="min-h-screen bg-blue-gray-50/50">
          <SideBar />
          <div className="xl:ml-80">
            <NavBar />
            <Suspense fallback={<div className="h-screen flex justify-center items-center"><Spinner className="h-12 w-12" /></div>}>
              <Routes>
                <Route path="/pets" element={<ProtectedRoute><PetsPage /></ProtectedRoute>} />
                <Route path="/orders" element={<ProtectedRoute><OrdersPage /></ProtectedRoute>} />
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Navigate replace to="/pets" />} />
              </Routes>
            </Suspense>
          </div>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;