import styled from "styled-components";
import magnifyGlass from "../../../assets/images/magnifyGlass-icon.png";

const PlateNumFilter = () => {
  return (
    <PlateNumFilterBox>
      <label>
        <img src={magnifyGlass} alt="Magnify Glass"></img>
        <input placeholder="고객 차량 번호"></input>
      </label>
    </PlateNumFilterBox>
  );
};

export default PlateNumFilter;

//styled-components
const PlateNumFilterBox = styled.div`
  height: 3rem;
  border: 0.07rem solid var(--borderGray);
  border-radius: 0.4rem;
  display: flex;
  align-items: center;
  padding: 0 1rem;

  label {
    flex-grow: 1;
    display: flex;
  }

  img {
    width: 1.7rem;
    height: 1.7rem;
    margin-right: 1rem;
  }

  input {
    flex-grow: 1;
    border: none;
    text-align: left;
    padding-right: 1rem;

    ::placeholder {
      color: var(--borderGray);
      text-align: center;
    }
    ::-webkit-input-placeholder {
      color: var(--borderGray);
      text-align: center;
    }
    :-ms-input-placeholder {
      color: var(--borderGray);
      text-align: center;
    }

    :focus {
      outline: none;
      ::placeholder {
        color: transparent;
      }
    }
  }
`;
