export class SurveyModel {
  url: string;
  name: string;
  surveyID: number;
  clickCount: number;

  constructor(name: string, url: string) {
    this.name = name;
    this.url = url;
    this.clickCount = 0;
  }
}
