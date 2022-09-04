import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Button } from 'antd';
import './less/Dialog.less'

const Dialog = (props) => {
    const node = document.createElement('div');
    document.body.appendChild(node);
    useEffect(() => {
        return () => {
            document.body.removeChild(node);
        };
    }, []);
    return createPortal(
        <div className="com-dialog">
            <div className="com-dialog-inner" >
                <div className="dialog-title">{props.title}</div>
                <div className="content">{props.children}</div>
                <div className="btn">
                    <Button type="default" onClick={props.onCancle}>{props.cancelText || '取消'}</Button>
                    <Button type="primary" onClick={props.onOk}>{props.sureText || '确定'}</Button>
                </div>
            </div>
        </div>,
        node
    )
}

export default Dialog;
