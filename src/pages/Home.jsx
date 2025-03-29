import Navbar from "../components/Navbar/navbar";
import Cards from "../components/Cards/Card";
import React, { useCallback, useState } from 'react'
import { useSelector } from "react-redux";
const LoginModal = React.lazy(() => import('../components/modals/loginModal'));


export default function Home() {
    const user = useSelector((state) => state.persisted.user.user) || null;
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLoginClick = useCallback(() => setIsModalOpen(true), []);
  const handleCloseModal = useCallback(() => setIsModalOpen(false), []);
  return (
    <>
    <Navbar handleSignIn={handleLoginClick} user={user} />
    <Cards/>
    <LoginModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  )
}
