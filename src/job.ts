import {Component} from "angular2/core";
import {View} from "angular2/core";
import {Inject} from "angular2/core";
import {RouteParams} from "angular2/router";
import {Job} from "./dashboard";
import {Http} from "angular2/http";
import {Headers} from "angular2/http";
import {JobForm} from "./job.form";
import {ChangeDetectionStrategy} from "angular2/core";
import {CORE_DIRECTIVES} from "angular2/common";

@Component({
})
@View({
    template: `
    <job-form [job]="job | async"></job-form>
    `,
    directives: [JobForm, CORE_DIRECTIVES]
})
export class JobPage {
    public job:any;
    constructor(@Inject(RouteParams) private params: RouteParams, @Inject(Http) private http: Http) {
        var hs = new Headers();
        hs.append("Authorization", "Bearer " + localStorage.getItem("jwt"));
        this.job = http.get("/api/jobs/"+params.get("repo"), {headers: hs}).map(res => res.json())
        .map(raw => Job.create(raw));
    }
}