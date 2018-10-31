export class SurveyModel {
  clickCount: string;
  groupTags: string[];
  surveyID: string;
  surveyName: string;
  surveyURL: string;

  constructor(clickC: string, groupT: string[], surveyI: string, surveyN: string, surveyU: string) {
    this.clickCount = clickC;
    this.groupTags = groupT;
    this.surveyID = surveyI;
    this.surveyName = surveyN;
    this.surveyURL = surveyU;
  }
}
