import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import WebNavbar from './components/WebNavbar';
import BottomNav from './components/BottomNav';
import { OnboardingTour } from './components/OnboardingTour';
import PermissionsOnboarding from './components/PermissionsOnboarding';
import { supabase } from './services/SupabaseManager';

import './index.css';

import LandingPage from './pages/LandingPage';
import Home from './pages/Home';
import Round from './pages/Round';
import Tournaments from './pages/Tournaments';
import Profile from './pages/Profile';
import Auth from './pages/Auth';
import CourseSelection from './pages/CourseSelection';
import PlayModeSelection from './pages/PlayModeSelection';
import FriendSelection from './pages/FriendSelection';
import CreateGroup from './pages/CreateGroup';
import EditProfile from './pages/EditProfile';
import EditStats from './pages/EditStats';
import RoundHistory from './pages/RoundHistory';
import RoundDetail from './pages/RoundDetail';
import EditRound from './pages/EditRound';
import Settings from './pages/Settings';
import MyStore from './pages/MyStore/index';
import GreenFee from './pages/GreenFee';
import CourseReservation from './pages/CourseReservation';
import MyReservations from './pages/MyReservations';
import CartPage from './pages/CartPage';
import NotificationsPage from './pages/NotificationsPage';
import TournamentManager from './pages/TournamentManager';
import TournamentParticipants from './pages/TournamentParticipants';
import CheckoutPage from './pages/CheckoutPage';
import CategoryPage from './pages/CategoryPage';
import CommunityPage from './pages/CommunityPage';
import MyBag from './pages/MyBag';
import SwingAnalysis from './pages/SwingAnalysis';
import MyPurchases from './pages/MyPurchases';
import { useOnlineStatus } from './hooks/useOnlineStatus';
import OfflineOverlay from './components/OfflineOverlay';
import MercadoPagoCallback from './pages/MercadoPagoCallback';
import TournamentRegistration from './pages/TournamentRegistration';

import { AuthProvider, useAuth } from './context/AuthContext';
import { QueryProvider } from './context/QueryProvider';
import { ToastProvider } from './context/ToastContext';

/* ─────────── Protected Route Wrapper ─────────── */
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { session, loading } = useAuth();
    if (loading) return null;
    if (!session) return <Navigate to="/auth" replace />;
    return <>{children}</>;
};

/* ─────────── Main App Content ─────────── */
const AppContent: React.FC = () => {
    const { session, loading } = useAuth();
    const location = useLocation();
    const isOnline = useOnlineStatus();
    const [showOnboarding, setShowOnboarding] = React.useState(false);
    const [showPermissionsOnboarding, setShowPermissionsOnboarding] = React.useState(false);

    // Check if permissions onboarding has been completed
    React.useEffect(() => {
        if (session && !localStorage.getItem('permissions_onboarding_completed')) {
            setShowPermissionsOnboarding(true);
        }
    }, [session]);

    React.useEffect(() => {
        if (session) {
            const checkOnboarding = async () => {
                try {
                    const { data } = await supabase
                        .from('profiles')
                        .select('has_completed_onboarding')
                        .eq('id', session.user.id)
                        .maybeSingle();

                    if (data && data.has_completed_onboarding === false) {
                        setShowOnboarding(true);
                    }
                } catch (err) {
                    console.error('Error checking onboarding status:', err);
                }
            };
            checkOnboarding();
        } else {
            setShowOnboarding(false);
        }
    }, [session]);

    // Splash
    if (loading) {
        return (
            <div style={{
                backgroundColor: '#0E2F1F',
                height: '100dvh',
                width: '100vw',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '20px'
            }}>
                <div className="loader"></div>
            </div>
        );
    }

    // Determine page context
    const isLandingPage = location.pathname === '/' && !session;
    const isAuthPage = location.pathname === '/auth';
    const isRegistrationPage = location.pathname.startsWith('/tournament-register/');
    const isPublicPage = isLandingPage || isAuthPage || isRegistrationPage;


    return (
        <div style={{
            minHeight: '100dvh',
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
        }}>
            {/* WebNavbar shown on ALL pages */}
            {!isRegistrationPage && <WebNavbar />}

            <main style={{
                flex: 1,
                paddingTop: '0', // Removido el padding de 72px por petición
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                position: 'relative',
            }}>
                <Routes>
                    {/* ═══ Public Routes ═══ */}
                    <Route path="/" element={session ? <Navigate to="/dashboard" replace /> : <LandingPage />} />
                    <Route path="/auth" element={session ? <Navigate to="/dashboard" replace /> : <Auth />} />
                    <Route path="/tournament-register/:id" element={<TournamentRegistration />} />
                    <Route path="/marketplace" element={session ? <Home /> : <LandingPage />} />

                    {/* ═══ Protected Routes ═══ */}
                    <Route path="/dashboard" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                    <Route path="/product/:id" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                    <Route path="/round" element={<ProtectedRoute><Round /></ProtectedRoute>} />
                    <Route path="/play-mode" element={<ProtectedRoute><PlayModeSelection /></ProtectedRoute>} />
                    <Route path="/friend-selection" element={<ProtectedRoute><FriendSelection /></ProtectedRoute>} />
                    <Route path="/create-group" element={<ProtectedRoute><CreateGroup /></ProtectedRoute>} />
                    <Route path="/select-course" element={<ProtectedRoute><CourseSelection /></ProtectedRoute>} />
                    <Route path="/green-fee" element={<ProtectedRoute><GreenFee /></ProtectedRoute>} />
                    <Route path="/green-fee/:courseId" element={<ProtectedRoute><CourseReservation /></ProtectedRoute>} />
                    <Route path="/my-reservations" element={<ProtectedRoute><MyReservations /></ProtectedRoute>} />
                    <Route path="/tournaments" element={<ProtectedRoute><Tournaments /></ProtectedRoute>} />
                    <Route path="/community" element={<ProtectedRoute><CommunityPage /></ProtectedRoute>} />
                    <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                    <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
                    <Route path="/my-store" element={<ProtectedRoute><MyStore /></ProtectedRoute>} />
                    <Route path="/my-events" element={<ProtectedRoute><TournamentManager /></ProtectedRoute>} />
                    <Route path="/my-events/:id/participants" element={<ProtectedRoute><TournamentParticipants /></ProtectedRoute>} />
                    <Route path="/profile/edit" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
                    <Route path="/profile/stats" element={<ProtectedRoute><EditStats /></ProtectedRoute>} />
                    <Route path="/rounds" element={<ProtectedRoute><RoundHistory /></ProtectedRoute>} />
                    <Route path="/rounds/:id" element={<ProtectedRoute><RoundDetail /></ProtectedRoute>} />
                    <Route path="/rounds/edit/:id" element={<ProtectedRoute><EditRound /></ProtectedRoute>} />
                    <Route path="/cart" element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
                    <Route path="/checkout" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
                    <Route path="/mercadopago-callback" element={<ProtectedRoute><MercadoPagoCallback /></ProtectedRoute>} />
                    <Route path="/my-purchases" element={<ProtectedRoute><MyPurchases /></ProtectedRoute>} />
                    <Route path="/category/:categoryId" element={<ProtectedRoute><CategoryPage /></ProtectedRoute>} />
                    <Route path="/my-bag" element={<ProtectedRoute><MyBag /></ProtectedRoute>} />
                    <Route path="/swing-analysis" element={<ProtectedRoute><SwingAnalysis /></ProtectedRoute>} />
                    <Route path="/notifications" element={<ProtectedRoute><NotificationsPage /></ProtectedRoute>} />

                    {/* Fallback */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </main>

            {/* BottomNav only on mobile for authenticated users */}
            {session && !isRegistrationPage && !isPublicPage && (
                <div className="hide-desktop">
                    <BottomNav />
                </div>
            )}

            {showOnboarding && session && !isRegistrationPage && (
                <OnboardingTour
                    userId={session.user.id}
                    onComplete={() => setShowOnboarding(false)}
                />
            )}

            <OfflineOverlay isOnline={isOnline} />

            {showPermissionsOnboarding && session && !isRegistrationPage && (
                <PermissionsOnboarding
                    onComplete={() => setShowPermissionsOnboarding(false)}
                />
            )}
        </div>
    );
};

const App: React.FC = () => {
    return (
        <QueryProvider>
            <ToastProvider>
                <AuthProvider>
                    <Router>
                        <AppContent />
                    </Router>
                </AuthProvider>
            </ToastProvider>
        </QueryProvider>
    );
};

export default App;
