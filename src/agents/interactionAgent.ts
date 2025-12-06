/**
 * Drug Interaction Agent - Checks for dangerous medicine combinations
 * Provides safety warnings and recommendations
 */

const drugInteractionDatabase: Record<string, string[]> = {
  'Paracetamol': ['Alcohol', 'Aspirin at high doses'],
  'Aspirin': ['Warfarin', 'Paracetamol at high doses'],
  'Ibuprofen': ['Aspirin', 'Blood thinners', 'Methotrexate'],
  'Metformin': ['Alcohol in excess', 'Contrast dye'],
  'Warfarin': ['Aspirin', 'NSAIDs', 'Vitamin K supplements'],
  'Vitamin D': ['Calcium supplements (may cause high calcium)'],
};

const severityMap: Record<string, 'low' | 'medium' | 'high'> = {
  'Alcohol': 'high',
  'Blood thinners': 'high',
  'Warfarin': 'high',
  'Aspirin': 'medium',
  'NSAIDs': 'medium',
  'Vitamin K supplements': 'medium',
  'Calcium supplements': 'low',
  'Contrast dye': 'high',
};

interface Interaction {
  medicine1: string;
  medicine2: string;
  severity: 'low' | 'medium' | 'high';
  description: string;
  recommendation: string;
}

export class InteractionAgent {
  static checkMedicineInteractions(medicines: string[]): Interaction[] {
    const interactions: Interaction[] = [];

    for (let i = 0; i < medicines.length; i++) {
      for (let j = i + 1; j < medicines.length; j++) {
        const med1 = medicines[i];
        const med2 = medicines[j];

        // Check if med1 interacts with med2
        const med1InteractionsList = drugInteractionDatabase[med1] || [];
        if (med1InteractionsList.some((int) => med2.includes(int))) {
          interactions.push({
            medicine1: med1,
            medicine2: med2,
            severity: severityMap[med2] || 'low',
            description: `${med1} may interact with ${med2}`,
            recommendation: `Consult with your doctor before taking ${med1} and ${med2} together`,
          });
        }

        // Check if med2 interacts with med1
        const med2InteractionsList = drugInteractionDatabase[med2] || [];
        if (med2InteractionsList.some((int) => med1.includes(int))) {
          interactions.push({
            medicine1: med2,
            medicine2: med1,
            severity: severityMap[med1] || 'low',
            description: `${med2} may interact with ${med1}`,
            recommendation: `Consult with your doctor before taking ${med2} and ${med1} together`,
          });
        }
      }
    }

    return interactions;
  }

  static getHighRiskInteractions(medicines: string[]): Interaction[] {
    return this.checkMedicineInteractions(medicines).filter((int) => int.severity === 'high');
  }

  static getWarnings(medicines: string[]): string[] {
    const warnings: string[] = [];
    const interactions = this.checkMedicineInteractions(medicines);

    interactions.forEach((int) => {
      warnings.push(int.recommendation);
    });

    return warnings;
  }

  static canTakeTogether(medicine1: string, medicine2: string): boolean {
    const interactions = this.checkMedicineInteractions([medicine1, medicine2]);
    return interactions.filter((int) => int.severity === 'high').length === 0;
  }
}

export default InteractionAgent;
