import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Button } from 'antd';
import './less/Modal.less'

const Dialog = (props) => {
    const node = document.createElement('div');
    document.body.appendChild(node);
    useEffect(() => {
        return () => {
            document.body.removeChild(node);
        };
    }, []);
    return createPortal(
        <div className="modal">
            <div className="modal-content">
                <div className="title">{props.title}</div>
                <div className="content">{props.children}</div>
                <div className="btn-box">
                    <div className='btn' onClick={props.onCancel}>{props.cancelText || '取消'}</div>
                    <div className='btn' onClick={props.onOk}>{props.sureText || '确定'}</div>
                </div>
            </div>
            <div className="modal-overlay"></div>
        </div>,
        node
    )
}

export default Dialog;
