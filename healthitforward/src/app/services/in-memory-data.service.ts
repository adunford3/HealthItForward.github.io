import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const threads = [
      {id: 1, title: "Diet help", content: "Content of first thread"},
      {id: 2, title: "helpful exercises?", content: "Content of second thread"},
      {id: 3, title: "Foods You Hate", content: "Content of third thread"},
      {id: 4, title: "Started meds, what to expect?", content: "Content of fourth" +
      " thread"},
      {id: 5, title: "Parkinson's Research in Atlanta Area?", content: "Content" +
      " of fifth thread"}
    ];
    return {threads};
  }
}
