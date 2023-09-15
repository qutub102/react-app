import { useNavigate, useParams } from "react-router-dom";

export function withRouter(Component) {
  return (props) => (
    <Component {...props} navigate={useNavigate()} params={useParams()} />
  );
}
