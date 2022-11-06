import ReactDOM from 'react-dom'
import "./assets/base.less"
import Router from './router'
import { RecoilRoot } from 'recoil'


ReactDOM.render(
    <RecoilRoot>
        <Router />
    </RecoilRoot>,
    document.getElementById('root')
)

