import Navbar from "../components/Navbar/navbar";
import Cards from "../components/Cards/Card";
import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
const LoginModal = React.lazy(() => import("../components/modals/loginModal"));
const UserProfile = React.lazy(() =>
  import("../components/modals/UserProfile")
);

export default function Home() {
  const user = useSelector((state) => state.persisted.user.user) || null;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProfileModalOpen, setProfileIsModalOpen] = useState(false);

  const handleLoginClick = useCallback(() => setIsModalOpen(true), []);
  const handleCloseModal = useCallback(() => setIsModalOpen(false), []);
  const handleProfileClick = useCallback(() => setProfileIsModalOpen(true), []);
  const handleCloseProfileModal = useCallback(() => setProfileIsModalOpen(false), []);
  return (
    <>
      <Navbar
        handleSignIn={handleLoginClick}
        handleProfileClick={handleProfileClick}
        user={user}
      />
      <Cards />
      <LoginModal isOpen={isModalOpen} onClose={handleCloseModal} />
      <UserProfile isOpen={isProfileModalOpen} onClose={handleCloseProfileModal} user={user} />
    </>
  );
}
