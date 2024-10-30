import { Button } from "reactstrap";
import styles from "./NotFound.module.scss";
import { SiNotepadplusplus } from "react-icons/si";

export function NotFound(props) {
  const { title } = props;
  return (
    <div className={styles.notfound}>
      <SiNotepadplusplus size={240} />
      <h6>{title}</h6>
      
    </div>
  );
}
