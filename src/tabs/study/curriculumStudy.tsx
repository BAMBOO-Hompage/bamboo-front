import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../../components/button.tsx';
import Nav from '../../components/nav.tsx';
import '../../App.css';

export default function CurriculumStudy() {
    const [cStudyList, setCStudyList] = useState('전체');
    return (
        <div>
            <Nav type="study" />
            <div className="background">
                <div style={{ height: '200vh', display: 'flex', padding: '100px 0' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false }}
                        transition={{
                            ease: 'easeInOut',
                            duration: 0.5,
                            y: { duration: 0.5 },
                        }}
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
                        <div style={{ position: 'absolute', right: '50px' }}>
                            커리큘럼
                            <br />
                            스터디
                            <div
                                style={{
                                    marginTop: '40px',
                                    fontFamily: 'Pretendard-Regular',
                                    fontSize: '16px',
                                }}
                            >
                                <div
                                    className="post_tabs"
                                    style={cStudyList === '전체' ? { color: '#2CC295' } : {}}
                                    onClick={() => {
                                        setCStudyList('전체');
                                    }}
                                >
                                    전체
                                </div>
                                <div
                                    className="post_tabs"
                                    style={cStudyList === 'PY' ? { color: '#2CC295' } : {}}
                                    onClick={() => {
                                        setCStudyList('PY');
                                    }}
                                >
                                    PY
                                </div>
                                <div
                                    className="post_tabs"
                                    style={cStudyList === 'DA' ? { color: '#2CC295' } : {}}
                                    onClick={() => {
                                        setCStudyList('DA');
                                    }}
                                >
                                    DA
                                </div>
                                <div
                                    className="post_tabs"
                                    style={cStudyList === 'ML' ? { color: '#2CC295' } : {}}
                                    onClick={() => {
                                        setCStudyList('ML');
                                    }}
                                >
                                    ML
                                </div>
                                <div
                                    className="post_tabs"
                                    style={cStudyList === 'DL' ? { color: '#2CC295' } : {}}
                                    onClick={() => {
                                        setCStudyList('DL');
                                    }}
                                >
                                    DL
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

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
