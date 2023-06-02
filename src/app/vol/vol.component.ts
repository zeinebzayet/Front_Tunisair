import { Component, OnInit } from '@angular/core';
import { VolService } from './vol.service';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
declare var $: any;

@Component({
  selector: 'app-vol',
  templateUrl: './vol.component.html',
  styleUrls: ['./vol.component.css']
})
export class VolComponent implements OnInit {
  public vols: vol[];
  public deleteVol: vol;
  public updateVol: vol;

  public detailsVol: vol;

  avions: Avion[];
  staffs: Staff[];
  aeroports: Aeroport[];
  entrepriseRestauration: EntrepriseRestauration[];


  VolForm:FormGroup =new FormGroup({
    reference: new FormControl(),
    dateDepart: new FormControl(),
    dateArrivee: new FormControl(),
    etat: new FormControl(),
    type: new FormControl(),
    prix: new FormControl()
    

});

VolupdateForm:FormGroup = new FormGroup({
  reference: new FormControl(),
  dateDepart: new FormControl(),
  dateArrivee: new FormControl(),
  etat: new FormControl(),
  type: new FormControl(),
  prix: new FormControl(),
  
  avion: new FormGroup({
    id: new FormControl()
  }),
  staff: new FormGroup({
    id: new FormControl()
  }),
  entrepriseRestauration: new FormGroup({
    id: new FormControl()
  }),
  aeroportDepart: new FormGroup({
    id: new FormControl()
  }),
  aeroportArrivee: new FormGroup({
    id: new FormControl()
  }),

});


  constructor(private volService: VolService ) { }

  ngOnInit(): void {
    this.volService.getAllVol().subscribe(
      (response: vol[]) => {
        console.log(response);
        this.vols = response;

      });

      this.volService.getAllAeroport().subscribe(
        (response: Aeroport[]) => {
          console.log(response);
          this.aeroports = response;
  
        });

        this.volService.getAllAvion().subscribe(
          (response: Avion[]) => {
            console.log(response);
            this.avions = response;
    
          });

          this.volService.getAllEse().subscribe(
            (response: EntrepriseRestauration[]) => {
              console.log(response);
              this.entrepriseRestauration = response;
      
            });

            this.volService.getAllStaff().subscribe(
              (response: Staff[]) => {
                console.log(response);
                this.staffs = response;
        
              });
  }

  public onAddVol(idav:number,idstaff:number,idese:number,idaerprtdep:number,idaerprtar:number): void{
    //document.getElementById('add-Materiel').click();
      const container = document.getElementById('main-container');
      const button = document.createElement('button');
      button.type = 'button';
      button.style.display = 'none';
      button.setAttribute('data-toggle', 'modal');
  

      this.volService.addVol(idav,idstaff,idese,idaerprtdep,idaerprtar,this.VolForm.value).subscribe(
        (response: vol) => {
          this.showNotification('top', 'center', 'add');

          this.VolForm.reset();
          this.ngOnInit();
        }
       
      );
    }

    public onUpdateVol(id:number,idavion:number,idstaff:number,idarptdep:number,idarptarv:number,idese:number): void{
      console.log(idavion);
      console.log(idstaff);    
      +this.VolupdateForm.get('avion').get('id').setValue(idavion);
      +this.VolupdateForm.get('staff').get('id').setValue(idstaff);
      +this.VolupdateForm.get('entrepriseRestauration').get('id').setValue(idese);
      +this.VolupdateForm.get('aeroportDepart').get('id').setValue(idarptdep);
      +this.VolupdateForm.get('aeroportArrivee').get('id').setValue(idarptarv);

        this.volService.updateVol(id,this.VolupdateForm.value).subscribe(
          (response:vol) => {
            console.log(response);
            this.showNotification('top', 'center', 'update');
            this.ngOnInit();

          },
          (error: HttpErrorResponse) => {
            alert(error.message);
            console.log(this.VolupdateForm.value);
          }
        );
      }
      

    public onDeleteVol(volId: number): void {
      this.volService.deleteVol(volId).subscribe(
        (response: vol[]) => {
          console.log(response);
          this.ngOnInit();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }

    public onDeleteAllVol(): void {
      this.volService.deleteAllVol().subscribe(
        (response: vol[]) => {
          console.log(response);
          this.ngOnInit();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }




  
  public onOpenModal(vol: vol, mode: string): void {

    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if (mode === 'add') {
      button.setAttribute('data-target', '#addVolModal');
    }

    if (mode === 'deleteAll') {
      button.setAttribute('data-target', '#deleteAllVolModal');
    }
    if (mode === 'edit') {
      this.updateVol=vol;
      button.setAttribute('data-target', '#updateVolModal');
    }
    if (mode === 'delete') {
      this.deleteVol = vol;
      button.setAttribute('data-target', '#deleteVolModal');
    }
    if (mode === 'details') {
      this.detailsVol = vol;
      button.setAttribute('data-target', '#detailsVol');
    }
   

    container.appendChild(button);
    button.click();
  }


  showNotification(from, align, ch) {

    var message: String = "null";
    if (ch === "add") {
      message = "Vol Ajouté avec Succés.";
    }

    if (ch === "update") {
      message = "Vol Mis à Jour avec Succés.";
    }

    if (ch === "delete") {
      message = "Vol Supprimé avec Succés.";
    }
    const type = ['success'];
    $.notify({
      icon: "notifications",
      message: message

    }, {
      type: type[0],
      timer: 10,
      placement: {
        from: from,
        align: align
      },
      template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
        '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
        '<i class="material-icons" data-notify="icon">notifications</i> ' +
        '<span data-notify="title">{1}</span> ' +
        '<span data-notify="message">{2}</span>' +
        '<div class="progress" data-notify="progressbar">' +
        '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
        '</div>' +
        '<a href="{3}" target="{4}" data-notify="url"></a>' +
        '</div>'
    });

  }

  public searchVol(key: string): void {
    console.log(key);
    const results: vol[] = [];
    for (const vol of this.vols) {
      if (vol.reference.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
      vol.aeroportArrivee.nom.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
      vol.aeroportDepart.nom.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
      vol.avion.type.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
      vol.entrepriseRestauration.nom.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
      vol.etat.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
      vol.type.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
      vol.staff.id.toString().indexOf(key.toLowerCase()) !== -1 ||
      vol.dateDepart.toString().toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
      vol.dateArrivee.toString().toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        vol.prix.toString().indexOf(key.toLowerCase()) !== -1) {
        results.push(vol);
      }
    }
    this.vols = results;
    if (results.length === 0 || !key) {
      this.ngOnInit();
    }
  }


}


export class vol {
  id:number;
  reference: string;
  dateDepart: Date;
  dateArrivee: Date;
  etat: string;
  type: string;
  prix: number;
  avion: Avion;
  staff: Staff;
  entrepriseRestauration: EntrepriseRestauration
  aeroportDepart: Aeroport;
  aeroportArrivee: Aeroport;
}

export class Avion{
  id:number;
  type:string;
  etat:string;

}

export class Staff{
  id:number;
  nbEmployes:number;
}

export class EntrepriseRestauration{
  id:number;
  nom:string;
  adresse:string;
  tel:string;
}

export class Aeroport{
  id:number;
  nom:string;
}
