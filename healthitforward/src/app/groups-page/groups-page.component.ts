import {Component, OnInit} from '@angular/core';
import {UserService} from '../core/user.service';
import {GroupService} from '../core/group.service';
import {GroupModel} from '../core/group.model';
import {Router} from '@angular/router';

@Component({
    selector: 'hif-groups-page',
    templateUrl: './groups-page.component.html',
    styleUrls: ['./groups-page.component.css']
})

//Component for user personal groups page
export class GroupsPageComponent implements OnInit {

    groups;
    selectedGroup: GroupModel;

    constructor(public userService: UserService,
                public groupService: GroupService,
                private router: Router) {
        const g = this.groupService.getGroups().then(function (groups) {
            console.log('Group Stuff Here:');
            console.log(groups);
            console.log('groupID: ' + groups[0].groupID);
            return groups;
        });
        this.groups = Promise.resolve(g);
    }

    ngOnInit() {
    }

    // allows
    onSelect(group: GroupModel): void {
        this.selectedGroup = group;
        console.log(this.selectedGroup);
        this.router.navigate(['/group-page', group.groupID]);
    }

    /**
     * Creates a new group in the database and displays the update onscreen.
     * @param groupTitle The title of the group being created.
     */
    createGroup(groupTitle: String) {
        // this.userService.createGroup(groupTitle);
        location.reload(true);
        alert('New group created!');
    }

    /**
     * Sorts groups by number of users subscribed.
     */
    sortByPopular() {
        this.groups.then((myGroups: any[]) => {
            myGroups.sort((a, b) => {
                if (b.users.length > a.users.length) {
                    return 1;
                }

                if (b.users.length < a.users.length) {
                    return -1;
                }
                return 0;
            });
        });
    }

    /**
     * Sorts groups alphabetically by their name.
     */
    sortByAlphabetical() {
        this.groups.then((myGroups: any[]) => {
            myGroups.sort((a, b) => {
                if (a.groupName > b.groupName) {
                    return 1;
                }

                if (a.groupName < b.groupName) {
                    return -1;
                }
                return 0;
            });
        });
    }

    /**
     * Sorts groups by the default ordering, aka oldest groups to newest groups.
     */
    sortByDefault() {
        const g = this.groupService.getGroups().then(function (groups) {
            console.log('Group Stuff Here:');
            console.log(groups);
            console.log('groupID: ' + groups[0].groupID);
            return groups;
        });
        this.groups = Promise.resolve(g);
    }

}
