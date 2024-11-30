import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../../components/button.tsx';
import Nav from '../../components/nav.tsx';
import BottomInfo from '../../components/bottomInfo.tsx';
import '../../App.css';

export default function Introduction() {
    return (
        <div>
            <Nav type="joinUs" />
            <div className="background">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{
                        ease: 'easeInOut',
                        duration: 0.5,
                        y: { duration: 0.5 },
                    }}
                    style={{ height: '200vh', display: 'flex', padding: '100px 0' }}
                >
                    <div
                        style={{
                            position: 'relative',
                            width: '300px',
                            borderRight: '1px solid #444',
                            fontFamily: 'Pretendard-Bold',
                            fontSize: '28px',
                            color: '#fff',
                            textAlign: 'left',
                        }}
                    >
                        <div style={{ position: 'absolute', right: '50px' }}>동아리 소개</div>
                    </div>

                    <div
                        style={{
                            position: 'relative',
                            width: '80%',
                            fontFamily: 'Pretendard-Bold',
                            fontSize: '28px',
                            color: '#fff',
                            textAlign: 'left',
                        }}
                    ></div>
                </motion.div>

                <BottomInfo />
            </div>
        </div>
    );
}