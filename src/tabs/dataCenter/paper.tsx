import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Nav from '../../components/nav.tsx';
import BottomInfo from '../../components/bottomInfo.tsx';
import AlexandriaData from '../../mockup_data/alexandria_data.tsx';
import '../../App.css';

export default function Paper() {
    const data = AlexandriaData();

    const paperId = localStorage.getItem('paperId');
    const currentPaper = data.filter((paper) => paperId == paper.id)[0];

    return (
        <div>
            <Nav type="dataCenter" />
            <div id="background" className="background">
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
                            width: '1120px',
                            heidht: '100%',
                            textAlign: 'left',
                        }}
                    >
                        <div style={{ width: '810px', position: 'absolute', left: '60px' }}>
                            <div
                                style={{
                                    marginBottom: '15px',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                            >
                                <div
                                    style={{
                                        fontFamily: 'Pretendard-SemiBold',
                                        fontSize: '18px',
                                        color: '#2CC295',
                                    }}
                                >
                                    {currentPaper.category}
                                </div>
                                <div style={{ height: '25px' }}>
                                    <img
                                        src="../../img/btn/trash_disabled.png"
                                        style={{ width: '30px', cursor: 'pointer', marginRight: '15px' }}
                                        onClick={() => {
                                            const confirm = window.confirm('정말 삭제하시겠습니까?');
                                            if (confirm) {
                                                window.location = '/alexandria';
                                            }
                                        }}
                                        onMouseOver={(event) => {
                                            event.target.src = `../../img/btn/trash_enabled.png`;
                                        }}
                                        onMouseOut={(event) => {
                                            event.target.src = `../../img/btn/trash_disabled.png`;
                                        }}
                                    />
                                    <img
                                        src="../../img/btn/edit_enabled.png"
                                        style={{ width: '30px', cursor: 'pointer' }}
                                        onClick={() => {
                                            window.location = '/paperEdit';
                                        }}
                                    />
                                </div>
                            </div>
                            <div
                                style={{
                                    marginBottom: '15px',
                                    fontFamily: 'Pretendard-SemiBold',
                                    fontSize: '30px',
                                    color: '#fff',
                                }}
                            >
                                {currentPaper.title}
                            </div>
                            <div
                                style={{
                                    marginBottom: '100px',
                                    fontFamily: 'Pretendard-Light',
                                    fontSize: '16px',
                                    color: '#fff',
                                }}
                            >
                                작성 일자 : {currentPaper.date}
                            </div>
                            <div
                                style={{
                                    marginBottom: '15px',
                                    fontFamily: 'Pretendard-Light',
                                    fontSize: '16px',
                                    color: '#fff',
                                }}
                            >
                                {currentPaper.content.replace(/(?:\r\n|\r|\n)/g, '<br>')}
                            </div>
                        </div>
                    </motion.div>
                </div>

                <BottomInfo />
            </div>
        </div>
    );
}
