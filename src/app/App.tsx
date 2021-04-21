import { Container } from 'reactstrap';
import Todos from '../todos/Todos';
import styles from './App.module.css';

function App() {
  return (
    <Container className={styles.appRoot}>
      <Todos />
    </Container>
  );
}

export default App;
