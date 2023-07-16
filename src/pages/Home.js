import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { useTranslation  } from 'react-i18next';
import logo from '../logo.svg';
import { addLogin } from '../js/actions'


function Home() {

  const user = useSelector(state => state.user);
  const login = useSelector(state => state.login);
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation(["home","footer"]);

  const [data, setDdata] = useState('user');
  
  useEffect(() => {

    document.title = `You clicked ${data} times`;
  });

  const display = (value) => {
    console.log(value);
    dispatch(addLogin( value ));
  }

  const renderButton = () => {
    return (<button onClick={e=>display(Math.random())}>Button</button>)
  }

  const changeLanguage = lng => {
    i18n.changeLanguage(lng);
  };

 
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>{t("hello")}</h2>
        <p>{t("footer:address")}</p>
        <p>{user}</p>
        <p>{login}</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        {renderButton()}
        <button onClick={() => changeLanguage("th")}>th</button>
        <button onClick={() => changeLanguage("en")}>en</button>
        <Link to="/example" >example</Link>
        <Link to="/test" >test</Link>
      </header>
      
    </div>
  );
 
}

export default Home;
