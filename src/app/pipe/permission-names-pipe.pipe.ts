import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'permissionNamesPipe'
})
export class PermissionNamesPipePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    switch (value) {
      case 'ROLE_DR_SPEC': {
        return 'Doktor specijalista';
      }
      case 'ROLE_DR_SPEC_POV': {
        return 'Doktor specijalista (poverljiv pristup)';
      }
      case 'ROLE_DR_SPEC_ODELJENJA': {
        return 'Doktor specijalista (načelnik odeljenja)';
      }
      case 'ROLE_MED_SESTRA': {
        if (localStorage.getItem('gender') === 'Muski') {
          return 'Medicinski tehničar';
        }
        return 'Medicinska sestra';
      }
      case 'ROLE_VISA_MED_SESTRA': {
        if (localStorage.getItem('gender') === 'Muski') {
          return 'Viši medicinski tehničar';
        }
        return 'Viša medicinska sestra';
      }
      case 'ROLE_LAB_TEHNICAR': {
        return 'Laboratorijski tehničar';
      }
      case 'ROLE_VISI_LAB_TEHNICAR': {
        return 'Viši laboratorijski tehničar';
      }
      case 'ROLE_RECEPCIONER': {
        return 'Recepcioner';
      }
      case 'ROLE_MED_BIOHEMICAR': {
        return 'Medicinski biohemičar';
      }
      case 'ROLE_SPEC_MED_BIOHEMIJE': {
        return 'Specijalista medicinske biohemije';
      }
      default: {
        return '';
      }
    }
  }

}
