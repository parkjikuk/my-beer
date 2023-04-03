import styled from 'styled-components';

function Loading() {
  return (
    <Spinner>
      <div></div>
    </Spinner>
  );
}

const Spinner = styled.div`
  margin: 100px auto;
  width: 80px;
  height: 80px;
  position: relative;
  text-align: center;

  div {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    animation: spin 2s linear infinite;
  }

  div:after {
    content: " ";
    display: block;
    width: 40%;
    height: 40%;
    margin: 16% auto;
    border-radius: 50%;
    border: 10px solid #fff;
    border-color: #fff transparent #fff transparent;
    animation: spin 1.5s ease-in-out infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default Loading;