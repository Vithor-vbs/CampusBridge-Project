import React from 'react';
import styles from './Info.module.css';
import { FaClock, FaPhoneAlt } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";

const InfoContainer: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <h2>
          <IoLocationSharp size={30} /> 
          <span>Endereço</span>
        </h2>
        <p>Av. Washington Soares, <br />
            1321 - Edson Queiroz, <br />
            Fortaleza - CE, 60811-905</p>
      </div>
      <div className={styles.form}>
        <h2>
          <FaPhoneAlt size={25} /> 
          <span>Telefone</span>
        </h2>
        <p>Mobile: +(84) 546-6789 <br />
           Hotline: +(84) 456-6789</p>
      </div>
      <div className={styles.form}>
        <h2>
          <FaClock size={25} /> <span>Disponibilidade</span>
        </h2>
        <p>Monday-Friday: 9am-5pm <br />
           Saturday-Sunday: 9:00 - 21:00 
        </p>
      </div>
    </div>
  );
};

export default InfoContainer;