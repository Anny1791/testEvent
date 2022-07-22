import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';

const Get_getAllEventCategory = gql`
  query {
    getAllEventCategory {
      _id
      name
      description
      active_flag
    }
  }
`;

const Get_getEventCategoryByName = gql`
  query ($NAME: String!) {
    getEventCategoryByName(name: $NAME) {
      _id
      name
      description
      active_flag
    }
  }
`;
const Get_searchEventCategory = gql`
query(
  $NAME: String!,
  $ACTIVE_FLAG: Boolean
  )
{
  searchEventCategory(
    filter:{
      name:$NAME,
      active:$ACTIVE_FLAG
      }){
    name
    description
    active_flag
  }
}
`

@Component({
  selector: 'app-event-category',
  templateUrl: './event-category.component.html',
  styleUrls: ['./event-category.component.css'],
})
export class EventCategoryComponent implements OnInit {
  isCard: boolean = false;
  event_category: any[] = [];
  selectbyName= '';

  active_flag = false;

  toggle(active_flag: boolean) {
    this.active_flag = active_flag;
  }

  eventForm = this.formb.group({
    name: ['', Validators.required],
    description: [''],
    active_flag: [false],
  })

  constructor(
    private apollo: Apollo,
    private router: Router,
    private route: ActivatedRoute,
    private formb: FormBuilder
  ) {}

  openCard() {
    this.isCard = !this.isCard;
  }
  // resetSearchForm(){
  //   this.eventForm.reset();
  //   this.eventForm.get('name')?.reset('');
  //   this.eventForm.get('description')?.reset('');
  //   // this.eventForm.get('active')?.reset('');
  // }

  ngOnInit(): void {
    this.apollo
      .watchQuery({
        query: Get_getAllEventCategory,
      })
      .valueChanges.subscribe((res: any) => {
        this.event_category = res?.data?.getAllEventCategory;
        console.log('Data Event Category', res);
      });
  }
  // clearEventCategoryForm() {
  //   this.eventForm.reset();
  // }
  resetSearchForm(){
    this.eventForm.reset();
    this.eventForm.get('name')?.reset('');
    this.eventForm.get('description')?.reset('');
    this.eventForm.get('active_flag')?.reset();
  }

  resigterEventCategory() {
    this.router.navigate(['resigter-eventcategory', '']);
  }

  editEventCategory(id: string) {
    this.apollo
      .watchQuery({
        query: Get_getEventCategoryByName,
        variables: {
          ID: id,
        },
      })
      .valueChanges.subscribe((res: any) => {
        console.log('Search By ID: ', id);
      });
    this.router.navigate(['edit-eventcategory', id]);
  }

  searchEventCategoryByName() {
    this.apollo
      .watchQuery({
        query: Get_getEventCategoryByName,
        variables: {
          NAME: this.eventForm.controls['name'].value,
        },
      })
      .valueChanges.subscribe((res: any) => {
        this.event_category = res?.data?.getEventCategoryByName;
        console.log('Search By Name: ', this.event_category);
      });
  }
  searchEventCategory() {
    this.apollo
      .watchQuery({
        query: Get_searchEventCategory,
        variables: {
          NAME: this.eventForm.controls["name"].value,
          ACTIVE_FLAG: this.eventForm.controls["active_flag"].value,
        },
      })
      .valueChanges.subscribe((res: any) => {
        this.event_category = res?.data?.searchEventCategory;
        console.log('Search By Name: ', this.event_category);
      });
  }

}
