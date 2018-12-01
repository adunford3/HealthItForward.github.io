import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {SurveyModel} from '../core/survey.model';
import {SurveyService} from '../core/survey.service';
import {GroupService} from '../core/group.service';
import {UserService} from '../core/user.service';

@Component({
    selector: 'hif-surveys',
    templateUrl: './surveys.component.html',
    styleUrls: ['./surveys.component.css']
})
export class SurveysComponent implements OnInit {

    selectedSurvey;
    surveys;
    // form: FormGroup;
    form = this.formBuilder.group({
        name: [''],
        url: [''],
        groupTags: new FormArray([])
    });

    groupTags = [];

    constructor(private formBuilder: FormBuilder,
                public surveyService: SurveyService,
                public groupService: GroupService,
                public userService: UserService) {
        const self = this;
        this.groupService.getGroups().then(async function(groups) {
            let i = 0;
            groups.forEach(function(group) {
                // console.log(group.groupName);
                self.groupTags[i++] = { id: i * 100, name: group.groupName };
                // console.log(self.groupTags[i - 1]);
            });
        }).then(function() {
            // Create a new array with a form control for each order
            const controls = self.groupTags.map(c => new FormControl(false));
            controls[0].setValue(true); // Set the first checkbox to true (checked)

            self.form = self.formBuilder.group({
                name: [''],
                url: [''],
                groupTags: new FormArray(controls)
            });
        });

    }

    /**
     * On initialization calls getSurveys(), this retrieves an array of all the
     * surveyModels stored on the database
     */
    ngOnInit() {
        const s = this.surveyService.getSurveys().then(function (surveys) {
            console.log('Survey Stuff Here:');
            console.log(surveys);
            console.log('SurveyName: ' + surveys[0].surveyName);
            return surveys;
        });
        this.surveys = Promise.resolve(s);

        console.log(this.surveys);
    }

    /**
     * On click calls updateClickCount(), this update a specific survey's clickCount by one
     * @param survey A surveyModel containing the clickCount of a survey
     */
    linkClick(survey: SurveyModel) {
        this.selectedSurvey = survey;
        window.open(this.selectedSurvey.surveyURL, "_blank");
        this.surveyService.updateClickCount(survey.surveyID, Number(survey.clickCount));
        this.userService.subscribeToSurvey(survey.surveyID);
        // location.reload(true);
    }

    onSubmit() {
        const selectedOrderIds = this.form.value.groupTags
            .map((v, i) => v ? this.groupTags[i].name : null)
            .filter(v => v !== null);
        let mySurvey = new SurveyModel('0', selectedOrderIds, '', this.form.value.name, this.form.value.url);
        this.surveyService.addSurvey(mySurvey);
        alert('Your survey \'' + this.form.value.name + '\' has been posted!');
        // location.reload(true);
    }
}
