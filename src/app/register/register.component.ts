import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Service } from '../services/customer.service';
import { ICustomer } from '../interfaces/ICustomer';
import { ISocialMedia } from '../interfaces/ISocialMedia';
import { INumber } from '../interfaces/INumber';
import { IAddress } from '../interfaces/IAddress';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Input() customer: ICustomer;
  @Output() customerSaved = new EventEmitter<boolean>();
  public id: number = 0;

  public formGroup: FormGroup;
  public phoneForm: FormGroup;
  public addressForm: FormGroup;
  public socialMediaForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private service: Service
    ) { }

  ngOnChanges() {
       
    this.formGroup = this.formBuilder.group({
      Name: ["", [Validators.nullValidator]],
      BirthdayDate: ["", [Validators.nullValidator]],
      CpfNumber: ["", [Validators.nullValidator]],
      RgNumber: ["", [Validators.nullValidator]],
    });

    this.phoneForm = this.formBuilder.group({
      phones: this.formBuilder.array([this.createPhoneFormGroup()])
    });

    this.addressForm = this.formBuilder.group({
      addresses: this.formBuilder.array([this.createAddressFormGroup()])
    });

    this.socialMediaForm = this.formBuilder.group({
      medias: this.formBuilder.array([this.createSocialMediaFormGroup()])
    });

    this.loadData();
  }

  ngOnInit(): void { }

  public loadData() {
      //console.log(this.customer)
      if(this.customer != undefined)
      {
        this.id = this.customer.idCustomer;

        this.formGroup.get('Name').setValue(this.customer.name);
        this.formGroup.get('RgNumber').setValue(this.customer.rgNumber);
        this.formGroup.get('CpfNumber').setValue(this.customer.cpfNumber);
        this.formGroup.get('BirthdayDate').setValue(this.customer.birthdayDate.toString().substring(0,10));
        
        this.customer.numbers.forEach(element => {
          this.populatePhone(element);
        });

        this.customer.addresses.forEach(element => {
          this.populateAddress(element);
        });

        this.customer.socialMedias.forEach(element => {
          this.populateSocialMedia(element);
        });
    }
  }

  public populatePhone(number: INumber) {    
    const phones = this.phoneForm.get('phones') as FormArray

    let form: FormGroup = phones.controls[0] as FormGroup
    if (phones.controls[0].get('id').value > 0)
    {
      form = this.createPhoneFormGroup();
      phones.push(form)
    }
 
    if(number != undefined)
    {
      form.get('id').setValue(number.idNumber);
      form.get('Identification').setValue(number.identification);
      form.get('PhoneNumber').setValue(number.phoneNumber);
    }
    
  }

  public addPhone() {
    const phones = this.phoneForm.get('phones') as FormArray
    phones.push(this.createPhoneFormGroup())
  }

  public removePhone(i: number) {
    const phones = this.phoneForm.get('phones') as FormArray
    if (phones.length > 1)
      phones.removeAt(i)
    else 
      phones.reset()
  }

  private createPhoneFormGroup(): FormGroup {
    return new FormGroup({
      'id': new FormControl('', Validators.nullValidator),
      'Identification': new FormControl('', Validators.nullValidator),
      'PhoneNumber': new FormControl('', Validators.nullValidator)
    })
  }

  public populateAddress(adress: IAddress) {
    const adresses = this.addressForm.get('addresses') as FormArray

    let form: FormGroup = adresses.controls[0] as FormGroup
    if (adresses.controls[0].get('id').value > 0)
    {
      form = this.createAddressFormGroup();
      adresses.push(form)
    }

    if(adress != undefined)
    {
      form.get('id').setValue(adress.idAddress);
      form.get('Identification').setValue(adress.identification);
      form.get('StreetAddress').setValue(adress.streetAddress);
    }
  }

  public addAddress() {
    const adresses = this.addressForm.get('addresses') as FormArray
    adresses.push(this.createAddressFormGroup())
  }

  public removeAddress(i: number) {
    const addresses = this.addressForm.get('addresses') as FormArray
    if (addresses.length > 1)
      addresses.removeAt(i)
    else 
      addresses.reset()
  }

  private createAddressFormGroup(): FormGroup {
    return new FormGroup({
      'id': new FormControl('', Validators.nullValidator),
      'Identification': new FormControl('', Validators.nullValidator),
      'StreetAddress': new FormControl('', Validators.nullValidator)
    })
  }

  public populateSocialMedia(socialMedia: ISocialMedia) {
    const medias = this.socialMediaForm.get('medias') as FormArray

    let form: FormGroup = medias.controls[0] as FormGroup
    if (medias.controls[0].get('id').value > 0)
    {
      form = this.createSocialMediaFormGroup();
      medias.push(form)
    }

    if(socialMedia != undefined)
    {
      form.get('id').setValue(socialMedia.idSocialMedia);
      form.get('Identification').setValue(socialMedia.identification);
      form.get('SocialMediaLink').setValue(socialMedia.socialMediaLink);
    }
  }

  public addSocialMedia() {
    const medias = this.socialMediaForm.get('medias') as FormArray
    medias.push(this.createSocialMediaFormGroup())
  }

  public removeSocialMedia(i: number) {
    const medias = this.socialMediaForm.get('medias') as FormArray
    if (medias.length > 1)
      medias.removeAt(i)
    else 
      medias.reset()
  }

  private createSocialMediaFormGroup(): FormGroup {
    return new FormGroup({
      'id': new FormControl('', Validators.nullValidator),
      'Identification': new FormControl('', Validators.nullValidator),
      'SocialMediaLink': new FormControl('', Validators.nullValidator)
    })
  }

  public SaveCustomer() {

    let phones: any = this.phoneForm.get('phones') as FormArray
    //console.log(phones.controls)
    let phonesArray: Array<INumber> = []
    phones.controls.forEach(element => {
      //console.log(element.value)
      //console.log(element.value.Identification)
      if(element.value.Identification != null && element.value.Identification != "" && element.value.PhoneNumber != null && element.value.PhoneNumber != "")
        phonesArray.push({
          idNumber: element.value.id == "" || element.value.id == undefined? 0 : element.value.id,
          identification: element.value.Identification,
          phoneNumber: element.value.PhoneNumber
        })
    });

    const addresses: any = this.addressForm.get('addresses') as FormArray
    let addressesArray: IAddress[] = []
    addresses.controls.forEach(element => {
      if(element.value.Identification != null && element.value.Identification != "" && element.value.StreetAddress != null && element.value.streetAddress != "")
        addressesArray.push({
          idAddress: element.value.id == ""? 0 : element.value.id,
          identification: element.value.Identification,
          streetAddress: element.value.StreetAddress
        })
    });

    let medias: any = this.socialMediaForm.get('medias') as FormArray
    let mediasArray: ISocialMedia[] = []
    medias.controls.forEach(element => {
      if(element.value.Identification != null && element.value.Identification != "" && element.value.SocialMediaLink != null && element.value.SocialMediaLink != "")
        mediasArray.push({
          idSocialMedia: element.value.id == ""? 0 : element.value.id,
          identification: element.value.Identification,
          socialMediaLink: element.value.SocialMediaLink
        })
    });

    const obj: ICustomer = {
      idCustomer: this.id,
      name: this.formGroup.get("Name").value,
      birthdayDate: this.formGroup.get("BirthdayDate").value,
      rgNumber: this.formGroup.get("RgNumber").value,
      cpfNumber: this.formGroup.get("CpfNumber").value,
      numbers: phonesArray,
      addresses: addressesArray,
      socialMedias: mediasArray
    };

    console.log(obj)
    
    if(this.id == 0)
      this.service.postCustomer(obj)
      .subscribe() , error => (
        console.log('error creating customer')
      );
    else
      this.service.putCustomer(obj)
      .subscribe() , error => (
        console.log('error updating customer')
      );
    
    this.customer = undefined
    this.id = 0

    this.customerSaved.emit(true);
  }
}