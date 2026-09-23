import { useState } from "react";
import Modal from "../components/Modal";

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="home">
      <h1>Joy Weather</h1>
      <p>You are just one step away from your city weather!</p>
      <button onClick={() => setIsModalOpen(true)} className="get-weather-btn">
        Get Weather
      </button>

      {/* input modal */}
      <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </div>
  );
}

export default Home;
