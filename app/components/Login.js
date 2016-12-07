import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';

import {CLIENT_ID} from 'app/secret';
import {authUser} from 'app/actions/auth';
import styles from './Login.scss';

const VK_AUTH_URL = `https://oauth.vk.com/authorize?client_id=${CLIENT_ID}&display=page&redirect_uri=blank.html&response_type=token&scope=139443359&v=5.60`;

export default class Login extends Component {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.greeting}>
          <p className={styles.welcomeString}>Добро пожаловать в <span className={styles.ivkTitle}>Invisible VK</span></p>
          <p>IVK является клиентом для популярной социальной сети Вконтакте. Он позволяет пользоваться социальной сетью незаметно для других!</p>
          <div>
            Список функций:
            <ul>
              <li>Время последнего посещения не обновляется</li>
              <li>Отправитель сообщения не знает о том, что вы прочитали его сообщение</li>
              <li>Получатель вашего сообщения не знает о том,что вы печатаете текст</li>
            </ul>
          </div>
        </div>
        <a className={styles.buttonLogin} href={VK_AUTH_URL}>
          <RaisedButton label="Войти" primary={true} fullWidth={true}/>
        </a>
      </div>
    )
  };
}
