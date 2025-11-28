import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'activeMembership'
})
export class ActiveMembershipPipe implements PipeTransform {

  transform(plans: any[]): any[] {

    return plans.filter(plan => {
      return plan.status !== null && plan.status.toString() === '1'
    });
  }
}
