import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../../components/button.tsx';
import Nav from '../../components/nav.tsx';
import '../../App.css';

export default function Discord() {
    return (
        <div>
            <Nav type="community" />
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
                            width: '30%',
                            borderRight: '1px solid #444',
                            fontFamily: 'Pretendard-Bold',
                            fontSize: '28px',
                            color: '#fff',
                            textAlign: 'left',
                        }}
                    >
                        <div style={{ position: 'absolute', right: '50px' }}>Discord</div>
                    </div>

                    <div
                        style={{
                            position: 'relative',
                            width: '70%',
                            fontFamily: 'Pretendard-Bold',
                            fontSize: '28px',
                            color: '#fff',
                            textAlign: 'left',
                        }}
                    ></div>
                </motion.div>

                <div
                    style={{
                        width: '100vw',
                        height: '150px',
                        backgroundColor: '#2CC295',
                        textAlign: 'center',
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <div></div>
                </div>
            </div>
        </div>
    );
}
