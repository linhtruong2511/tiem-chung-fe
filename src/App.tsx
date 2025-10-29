import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from './components/ui/toaster';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './components/layout/DashboardLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import KhachHang from './pages/KhachHang';
import PhieuKhamSangLoc from './pages/PhieuKhamSangLoc';
import PhieuTiem from './pages/PhieuTiem';
import ThanhToan from './pages/ThanhToan';
import Vaccine from './pages/Vaccine';
import LoVaccine from './pages/LoVaccine';
import NhanVien from './pages/NhanVien';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route
              path="khach-hang"
              element={
                <ProtectedRoute allowedRoles={['QUAN_TRI_VIEN', 'BAC_SI_KHAM']}>
                  <KhachHang />
                </ProtectedRoute>
              }
            />
            <Route
              path="phieu-kham-sang-loc"
              element={
                <ProtectedRoute allowedRoles={['BAC_SI_KHAM', 'BAC_SI_TIEM']}>
                  <PhieuKhamSangLoc />
                </ProtectedRoute>
              }
            />
            <Route
              path="phieu-tiem"
              element={
                <ProtectedRoute allowedRoles={['BAC_SI_TIEM', 'THU_NGAN']}>
                  <PhieuTiem />
                </ProtectedRoute>
              }
            />
            <Route
              path="thanh-toan"
              element={
                <ProtectedRoute allowedRoles={['THU_NGAN']}>
                  <ThanhToan />
                </ProtectedRoute>
              }
            />
            <Route
              path="vaccine"
              element={
                <ProtectedRoute allowedRoles={['QUAN_TRI_VIEN', 'QUAN_LY_VACCINE']}>
                  <Vaccine />
                </ProtectedRoute>
              }
            />
            <Route
              path="lo-vaccine"
              element={
                <ProtectedRoute allowedRoles={['QUAN_LY_VACCINE']}>
                  <LoVaccine />
                </ProtectedRoute>
              }
            />
            <Route
              path="nhan-vien"
              element={
                <ProtectedRoute allowedRoles={['QUAN_TRI_VIEN']}>
                  <NhanVien />
                </ProtectedRoute>
              }
            />
            <Route
              path="thong-ke"
              element={
                <ProtectedRoute allowedRoles={['QUAN_TRI_VIEN']}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
        <Toaster />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
