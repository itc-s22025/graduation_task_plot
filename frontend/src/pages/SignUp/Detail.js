import s from '../../styles/signUpDetail.module.css'

const Detail = () => {
    return(
        <>
            <main className={s.all}>
                <img src="/fitchatlogo.png" className={s.image}/>
                <div className={s.boxLarge}>
                    <h1 className={s.signUp}>SignUp</h1>

                    <ul className={s.ul}>
                        <li className={s.li}>User Name</li>
                        <li ><input type="text" placeholder="Name" className={s.box}/></li>
                    </ul>
                    <ul className={s.ul}>
                        <li className={s.li}>Birth Day</li>
                        <label className={s.selectbox}>
                            <select>
                                <option className={s.option}>Jan</option>
                                <option>Feb</option>
                                <option>Mar</option>
                                <option>Apr</option>
                                <option>May</option>
                                <option>Jun</option>
                                <option>Jul</option>
                                <option>Aug</option>
                                <option>Sep</option>
                                <option>Oct</option>
                                <option>Nov</option>
                                <option>Dec</option>
                            </select>
                        </label>

                        <label className={s.selectbox}>
                            <select>
                                <option>1950</option>
                                <option>1951</option>
                                <option>1952</option>
                                <option>1953</option>
                                <option>1954</option>
                                <option>1955</option>
                                <option>1956</option>
                                <option>1957</option>
                                <option>1958</option>
                                <option>1959</option>
                                <option>1960</option>
                                <option>1961</option>
                                <option>1962</option>
                                <option>1963</option>
                                <option>1964</option>
                                <option>1965</option>
                                <option>1966</option>
                                <option>1967</option>
                                <option>1968</option>
                                <option>1969</option>
                                <option>1970</option>
                                <option>1971</option>
                                <option>1972</option>
                                <option>1973</option>
                                <option>1974</option>
                                <option>1975</option>
                                <option>1976</option>
                                <option>1977</option>
                                <option>1978</option>
                                <option>1979</option>
                                <option>1980</option>
                                <option>1981</option>
                                <option>1982</option>
                                <option>1983</option>
                                <option>1984</option>
                                <option>1985</option>
                                <option>1986</option>
                                <option>1987</option>
                                <option>1988</option>
                                <option>1989</option>
                                <option>1990</option>
                                <option>1991</option>
                                <option>1992</option>
                                <option>1993</option>
                                <option>1994</option>
                                <option>1995</option>
                                <option>1996</option>
                                <option>1997</option>
                                <option>1998</option>
                                <option>1999</option>
                                <option>2000</option>
                                <option>2001</option>
                                <option>2002</option>
                                <option>2003</option>
                                <option>2004</option>
                                <option>2005</option>
                                <option>2006</option>
                                <option>2007</option>
                                <option>2008</option>
                                <option>2009</option>
                                <option>2010</option>
                                <option>2011</option>
                                <option>2012</option>
                                <option>2013</option>
                                <option>2014</option>
                                <option>2015</option>
                                <option>2016</option>
                                <option>2017</option>
                                <option>2018</option>
                                <option>2019</option>
                                <option>2020</option>
                                <option>2021</option>
                                <option>2022</option>
                                <option>2023</option>
                            </select>
                        </label>
                    </ul>
                    <ul className={s.ul}>
                        <li className={s.li}>Gender</li>
                        <label className={s.selectbox}>
                            <select>
                                <option>Male</option>
                                <option>Female</option>
                                <option>Other</option>
                            </select>
                        </label>
                    </ul>
                    <ul className={s.ul}>
                        <li className={s.li}>Filter</li>
                        <label className={s.selectbox}>
                            <select>
                                <option>Apply</option>
                                <option>Remove</option>
                            </select>
                        </label>
                        <p className={s.help}>?</p>
                        <p className={s.helpmsg}>Applyを選択することで、タイムラインに表示するユーザーを同性のユーザーのみに設定することができます。</p>
                    </ul>

                    <p><input type="submit" value="SIGN UP" className={s.signUpButton} /></p>
                </div>
            </main>
        </>
    )
}

export default Detail