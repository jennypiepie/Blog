import ReactDOM from 'react-dom'
import "./assets/base.less"
import Router from './router'
import store from './store'
import {Provider} from 'react-redux'
import { RecoilRoot } from 'recoil'


ReactDOM.render(
    <Provider store={store}>
        <RecoilRoot>
            <Router />
        </RecoilRoot>
    </Provider>,
    document.getElementById('root')
)

