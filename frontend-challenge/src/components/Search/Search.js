import React, {useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import useInput from "../../hooks/Input";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  input.search {
    background: ${(props) => props.theme.black};
    padding: 0.4rem 1rem;
    border: 1px solid ${(props) => props.theme.darkGrey};
    height: 35px;
    color: ${(props) => props.theme.primaryColor};
   
  }

  @media screen and (max-width: 700px) {
    input.search {
      display: none;
    }
  }


  .autocomplete {
    position: relative;
    width: 20rem;
  }

  .search-dropdown {
    position: absolute;
    top: 100%;
    left: 31%;
    width: 35%;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    background-color: #fff;
  }

  .search-results-list {
    margin: 0;
    padding: 0;
    list-style: none;
    display:block;
  }

  .search-result {
    padding: 0.75rem 1rem;
    cursor: pointer;
    color: #000;
  }

  .search-result:hover,
  .search-result:focus,
  .search-result:active {
    background-color: #f9fafc;
  }


`;

const Search = () => {
  const history = useHistory();
  const searchterm = useInput("");
  const [dropdown, setDropdown] = useState(false)

  const handleSearch = (e) => {
    if (e.keyCode === 13) {
      if (!searchterm.value.trim()) {
        return "Please enter the searchterm";
      }
      
      history.push(`/${searchterm.value}`);
      searchterm.setValue("");
      setDropdown(false)
    }
  };

 const showDropdown =  ()=>{
  setDropdown(true)
  }
  
 const hideDropdown = ()=> {
    setDropdown(false)
  }

  const searchRecent = (result)=> {
    history.push(`/${result}`);
    searchterm.setValue("");
    hideDropdown();
  }

  let  searchData =window.localStorage.getItem('recents')
  let  deduped = searchData === null ? [] : JSON.parse(searchData)
  var recents = Array.from(new Set(deduped));


  return (
    <Wrapper>
      <input
        className="search"
        type="text"
        placeholder=""
        value={searchterm.value}
        onKeyDown={handleSearch}
        onChange={searchterm.onChange}
        onFocus={ showDropdown}
      />
      {dropdown &&
        <div className="search-dropdown">
          <ul className="search-results-list">
            {recents.map(result => (
              <Link key={result.id} onClick={ () => searchRecent(result)}>
                  <li key={result}  className="search-result">{result}</li>
              </Link>
            ))}
          </ul>
        </div>
      }
    </Wrapper>
  );
};

export default Search;
