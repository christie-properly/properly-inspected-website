import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Create admin user
  console.log('Creating admin user...');
  const hashedPassword = await bcrypt.hash('johndoe123', 10);
  
  const admin = await prisma.user.upsert({
    where: { email: 'john@doe.com' },
    update: {},
    create: {
      email: 'john@doe.com',
      password: hashedPassword,
      name: 'Admin User',
      role: 'admin',
    },
  });
  console.log('✅ Admin user created');

  // Create services
  console.log('Creating services...');
  const servicesData = [
    {
      name: "Buyer's Home Inspection",
      slug: 'buyers-home-inspection',
      shortDescription: 'Comprehensive inspection for homebuyers to identify issues before purchase.',
      fullDescription: 'Our thorough buyer\'s home inspection examines all major systems and components of the property. We use advanced tools including thermal imaging, moisture meters, and 360° photo technology to give you a complete picture of your potential new home.',
      icon: 'Home',
      featured: true,
      order: 1,
      benefits: [
        'Identify hidden issues before closing',
        'Negotiating power with sellers',
        'Peace of mind in your investment',
        '360° virtual photos included',
        'Same-day report delivery',
        '11 month warranty protection'
      ],
      process: [
        'Schedule your inspection',
        'Meet inspector at property',
        'Comprehensive 2-4 hour inspection',
        'Receive detailed report within 24 hours',
        'Follow-up consultation included'
      ],
      pricing: 'Starting at $350',
      duration: '2-4 hours',
      metaTitle: 'Professional Home Inspection Services Tampa Bay | Properly Inspected',
      metaDescription: 'Comprehensive home inspections in Tampa Bay with 360° photos, same-day reports, and 11 month warranty. Certified InterNACHI inspector Lloyd Tillmann.'
    },
    {
      name: '4-Point Inspection',
      slug: '4-point-inspection',
      shortDescription: 'Required by Florida insurance companies for homes over 25 years old.',
      fullDescription: 'A 4-point inspection evaluates the four major systems that insurance companies care about most: roof, electrical, plumbing, and HVAC. Required by most Florida insurance carriers for older homes.',
      icon: 'ClipboardCheck',
      featured: true,
      order: 2,
      benefits: [
        'Required for Florida home insurance',
        'Avoid policy cancellations',
        'Quick turnaround time',
        'Professional documentation',
        'Insurance-ready format'
      ],
      process: [
        'Book your 4-point inspection',
        '1-2 hour evaluation',
        'Inspection of roof, electrical, plumbing, HVAC',
        'Insurance-ready report delivered',
        'Submit directly to your insurance company'
      ],
      pricing: 'Starting at $150',
      duration: '1-2 hours',
      metaTitle: '4-Point Inspection Tampa Bay FL | Insurance Home Inspection',
      metaDescription: '4-point inspections required by Florida insurance companies. Fast, professional service for roof, electrical, plumbing, and HVAC evaluation.'
    },
    {
      name: 'Wind Mitigation Inspection',
      slug: 'wind-mitigation-inspection',
      shortDescription: 'Save 10-45% on Florida home insurance with wind mitigation credits.',
      fullDescription: 'Wind mitigation inspections document the wind-resistant features of your home, potentially saving you hundreds of dollars annually on insurance premiums. Required documentation for Florida insurance discounts.',
      icon: 'Wind',
      featured: true,
      order: 3,
      benefits: [
        'Save 10-45% on insurance premiums',
        'Quick return on investment',
        'Required for insurance discounts',
        'Detailed photo documentation',
        'Official OIR-B1-1802 form'
      ],
      process: [
        'Schedule wind mitigation inspection',
        '1 hour roof and structure evaluation',
        'Documentation of wind-resistant features',
        'Complete OIR-B1-1802 form',
        'Submit to insurance for discounts'
      ],
      pricing: 'Starting at $100',
      duration: '1 hour',
      metaTitle: 'Wind Mitigation Inspection Tampa | Save on Home Insurance',
      metaDescription: 'Professional wind mitigation inspections in Tampa Bay. Save 10-45% on Florida home insurance with proper documentation.'
    },
    {
      name: 'New Construction Inspection',
      slug: 'new-construction-inspection',
      shortDescription: 'Even brand new homes need inspections to catch builder oversights.',
      fullDescription: 'New construction inspections protect your investment by identifying defects before you close. Builders make mistakes, and our inspections catch them while they\'re still under warranty.',
      icon: 'HardHat',
      featured: true,
      order: 4,
      benefits: [
        'Catch builder defects early',
        'Ensure code compliance',
        'Multi-phase inspection options',
        'Protect your investment',
        'Builder warranty leverage'
      ],
      process: [
        'Pre-drywall inspection (optional)',
        'Final walkthrough inspection',
        'Comprehensive defect documentation',
        'Builder punch list creation',
        'Follow-up re-inspection included'
      ],
      pricing: 'Starting at $350',
      duration: '2-3 hours',
      metaTitle: 'New Construction Home Inspection Tampa | Builder Defects',
      metaDescription: 'New construction inspections in Tampa Bay. Catch builder defects before closing. Pre-drywall and final walkthrough inspections available.'
    },
    {
      name: 'Pre-Listing Inspection',
      slug: 'pre-listing-inspection',
      shortDescription: 'Sell your home faster by addressing issues before listing.',
      fullDescription: 'Pre-listing inspections give sellers the advantage of knowing exactly what\'s wrong with their home before buyers do. Fix issues upfront, price accurately, and sell faster.',
      icon: 'FileText',
      featured: false,
      order: 5,
      benefits: [
        'Sell your home faster',
        'Avoid last-minute surprises',
        'Price your home accurately',
        'Show transparency to buyers',
        'Stronger negotiating position'
      ],
      process: [
        'Schedule pre-listing inspection',
        'Comprehensive home evaluation',
        'Receive detailed findings',
        'Make informed repair decisions',
        'List with confidence'
      ],
      pricing: 'Starting at $350',
      duration: '2-4 hours',
      metaTitle: 'Pre-Listing Home Inspection Tampa | Sell Faster',
      metaDescription: 'Pre-listing inspections help Tampa Bay sellers identify issues before buyers do. Sell faster and negotiate from strength.'
    },
    {
      name: 'Pool & Spa Inspection',
      slug: 'pool-spa-inspection',
      shortDescription: 'Specialized inspection for in-ground pools and spa systems.',
      fullDescription: 'Pool and spa inspections evaluate equipment, safety features, structural integrity, and functionality. Essential for Florida homes with pools.',
      icon: 'Waves',
      featured: false,
      order: 6,
      benefits: [
        'Identify costly repairs',
        'Safety hazard detection',
        'Equipment evaluation',
        'Compliance with safety standards',
        'Peace of mind'
      ],
      process: [
        'Schedule pool inspection',
        'Equipment and system evaluation',
        'Safety feature inspection',
        'Structural integrity check',
        'Detailed report with photos'
      ],
      pricing: 'Starting at $200',
      duration: '1-2 hours',
      metaTitle: 'Pool & Spa Inspection Tampa Bay | Pool Safety',
      metaDescription: 'Professional pool and spa inspections in Tampa Bay. Equipment evaluation, safety checks, and structural assessments.'
    },
    {
      name: '11th Month Warranty Inspection',
      slug: '11th-month-warranty-inspection',
      shortDescription: 'Catch builder defects before your warranty expires.',
      fullDescription: 'Most new home warranties expire after 12 months. An 11th month inspection catches defects while they\'re still covered, saving thousands in repair costs.',
      icon: 'Shield',
      featured: false,
      order: 7,
      benefits: [
        'Catch defects before warranty expires',
        'Save thousands in repairs',
        'Builder must fix covered items',
        'Detailed documentation',
        'Peace of mind'
      ],
      process: [
        'Schedule in month 11',
        'Comprehensive inspection',
        'Document all defects',
        'Submit findings to builder',
        'Verify repairs before warranty expires'
      ],
      pricing: 'Starting at $350',
      duration: '2-3 hours',
      metaTitle: '11th Month Warranty Inspection Tampa | Builder Warranty',
      metaDescription: 'Catch builder defects before your warranty expires. 11th month warranty inspections in Tampa Bay protect your investment.'
    },
    {
      name: 'Thermal Imaging Inspection',
      slug: 'thermal-imaging-inspection',
      shortDescription: 'See hidden issues with advanced infrared technology.',
      fullDescription: 'Thermal imaging reveals hidden moisture, insulation gaps, electrical hotspots, and HVAC inefficiencies that are invisible to the naked eye.',
      icon: 'Thermometer',
      featured: false,
      order: 8,
      benefits: [
        'Detect hidden moisture',
        'Find insulation gaps',
        'Identify electrical hotspots',
        'Locate HVAC inefficiencies',
        'Prevent costly repairs'
      ],
      process: [
        'Add thermal imaging to any inspection',
        'Infrared camera evaluation',
        'Photo documentation',
        'Problem area identification',
        'Detailed thermal report'
      ],
      pricing: 'Add-on service $100',
      duration: 'Add 30 minutes',
      metaTitle: 'Thermal Imaging Home Inspection Tampa | Infrared Camera',
      metaDescription: 'Advanced thermal imaging inspections reveal hidden moisture, electrical issues, and insulation problems in Tampa Bay homes.'
    },
    {
      name: 'Mold Assessment',
      slug: 'mold-assessment',
      shortDescription: 'Professional mold testing and assessment by licensed assessor.',
      fullDescription: 'Lloyd Tillmann is a Florida-licensed Mold Assessor (#MRSA5241). We provide comprehensive mold testing, air quality sampling, and remediation recommendations.',
      icon: 'AlertTriangle',
      featured: false,
      order: 9,
      benefits: [
        'Licensed FL Mold Assessor',
        'Air quality testing',
        'Surface sampling',
        'Lab analysis',
        'Remediation protocol'
      ],
      process: [
        'Schedule mold assessment',
        'Visual inspection',
        'Air and surface sampling',
        'Lab analysis',
        'Detailed report with recommendations'
      ],
      pricing: 'Starting at $350',
      duration: '1-2 hours',
      metaTitle: 'Mold Assessment Tampa | Licensed FL Mold Assessor',
      metaDescription: 'Professional mold testing and assessment in Tampa Bay by licensed Florida Mold Assessor Lloyd Tillmann (#MRSA5241).'
    },
    {
      name: 'Termite Inspection',
      slug: 'termite-inspection',
      shortDescription: 'Wood-destroying organism inspection for Florida homes.',
      fullDescription: 'Termite inspections identify wood-destroying insects and organisms that can cause significant structural damage to Florida homes.',
      icon: 'Bug',
      featured: false,
      order: 10,
      benefits: [
        'Protect structural integrity',
        'Required for some mortgages',
        'Early detection saves money',
        'Treatment recommendations',
        'Peace of mind'
      ],
      process: [
        'Schedule termite inspection',
        'Comprehensive property evaluation',
        'Evidence documentation',
        'Treatment recommendations',
        'Official inspection report'
      ],
      pricing: 'Starting at $125',
      duration: '1 hour',
      metaTitle: 'Termite Inspection Tampa Bay | WDO Inspection',
      metaDescription: 'Professional termite and wood-destroying organism inspections in Tampa Bay. Protect your home from structural damage.'
    },
    {
      name: 'Re-Inspection',
      slug: 're-inspection',
      shortDescription: 'Verify repairs from initial inspection were completed properly.',
      fullDescription: 'Re-inspections confirm that issues identified in the original inspection have been properly addressed and repaired.',
      icon: 'RefreshCw',
      featured: false,
      order: 11,
      benefits: [
        'Verify repairs completed',
        'Ensure quality workmanship',
        'Required for some lenders',
        'Peace of mind before closing',
        'Discounted rate'
      ],
      process: [
        'Schedule re-inspection',
        'Return to property',
        'Verify repair completion',
        'Document findings',
        'Updated report provided'
      ],
      pricing: 'Starting at $150',
      duration: '1 hour',
      metaTitle: 'Re-Inspection Services Tampa | Repair Verification',
      metaDescription: 'Re-inspection services in Tampa Bay verify repairs from initial inspection were completed properly.'
    },
    {
      name: 'Roof Certification',
      slug: 'roof-certification',
      shortDescription: 'Official roof certification for insurance and real estate.',
      fullDescription: 'Roof certification provides official documentation of your roof\'s condition, age, and remaining useful life for insurance and real estate transactions.',
      icon: 'Home',
      featured: false,
      order: 12,
      benefits: [
        'Required by some insurers',
        'Helpful for home sales',
        'Drone inspection available',
        'Detailed documentation',
        'Professional certification'
      ],
      process: [
        'Schedule roof certification',
        'Comprehensive roof evaluation',
        'Drone photography (if needed)',
        'Condition assessment',
        'Official certification report'
      ],
      pricing: 'Starting at $150',
      duration: '1 hour',
      metaTitle: 'Roof Certification Tampa | Professional Roof Inspection',
      metaDescription: 'Official roof certifications in Tampa Bay for insurance and real estate. Drone inspection available.'
    },
    {
      name: 'Sewer Scope Inspection',
      slug: 'sewer-scope-inspection',
      shortDescription: 'Camera inspection of sewer lines to detect blockages and damage.',
      fullDescription: 'Sewer scope inspections use specialized camera equipment to inspect the condition of underground sewer lines, identifying blockages, root intrusion, and damage.',
      icon: 'Camera',
      featured: false,
      order: 13,
      benefits: [
        'Avoid costly sewer repairs',
        'Video documentation',
        'Identify root intrusion',
        'Detect pipe damage',
        'Peace of mind'
      ],
      process: [
        'Schedule sewer scope',
        'Camera inserted into sewer line',
        'Video recording of condition',
        'Problem identification',
        'Report with video footage'
      ],
      pricing: 'Starting at $200',
      duration: '1 hour',
      metaTitle: 'Sewer Scope Inspection Tampa | Sewer Camera',
      metaDescription: 'Sewer line camera inspections in Tampa Bay identify blockages and damage before they become expensive problems.'
    },
    {
      name: 'Solar System Inspection',
      slug: 'solar-system-inspection',
      shortDescription: 'Evaluation of solar panel systems and components.',
      fullDescription: 'Solar system inspections evaluate the condition, installation quality, and functionality of solar panels and related equipment.',
      icon: 'Sun',
      featured: false,
      order: 14,
      benefits: [
        'Verify proper installation',
        'Assess system performance',
        'Identify safety issues',
        'Documentation for buyers',
        'Peace of mind'
      ],
      process: [
        'Schedule solar inspection',
        'Panel and equipment evaluation',
        'Electrical connections check',
        'Performance assessment',
        'Detailed report with findings'
      ],
      pricing: 'Starting at $150',
      duration: '1 hour',
      metaTitle: 'Solar Panel Inspection Tampa | Solar System Evaluation',
      metaDescription: 'Professional solar panel system inspections in Tampa Bay. Verify installation quality and performance.'
    },
    {
      name: 'Well Inspection',
      slug: 'well-inspection',
      shortDescription: 'Water well system inspection and water quality testing.',
      fullDescription: 'Well inspections evaluate the condition and functionality of private water well systems, including water quality testing.',
      icon: 'Droplet',
      featured: false,
      order: 15,
      benefits: [
        'Assess well condition',
        'Water quality testing',
        'Identify system issues',
        'Required for some sales',
        'Health and safety'
      ],
      process: [
        'Schedule well inspection',
        'Well system evaluation',
        'Water quality testing',
        'Lab analysis',
        'Comprehensive report'
      ],
      pricing: 'Starting at $250',
      duration: '1-2 hours',
      metaTitle: 'Well Inspection Tampa | Water Well Testing',
      metaDescription: 'Professional well inspections and water quality testing in Tampa Bay. Ensure safe, reliable water supply.'
    },
    {
      name: 'Post-Storm Inspection',
      slug: 'post-storm-inspection',
      shortDescription: 'Comprehensive damage assessment after hurricanes and severe storms.',
      fullDescription: 'Post-storm inspections document damage from hurricanes and severe weather for insurance claims and repair planning.',
      icon: 'CloudRain',
      featured: false,
      order: 16,
      benefits: [
        'Insurance claim documentation',
        'Complete damage assessment',
        'Detailed photo evidence',
        'Repair prioritization',
        'Fast turnaround'
      ],
      process: [
        'Schedule post-storm inspection',
        'Comprehensive damage evaluation',
        'Extensive photo documentation',
        'Insurance-ready report',
        'Repair recommendations'
      ],
      pricing: 'Starting at $300',
      duration: '2-3 hours',
      metaTitle: 'Post-Storm Home Inspection Tampa | Hurricane Damage',
      metaDescription: 'Post-storm damage inspections in Tampa Bay. Professional documentation for insurance claims after hurricanes and severe weather.'
    },
    {
      name: 'Pre-Drywall Inspection',
      slug: 'pre-drywall-inspection',
      shortDescription: 'Inspect new construction before walls are closed up.',
      fullDescription: 'Pre-drywall inspections examine the structure, framing, electrical, and plumbing before they\'re hidden behind walls. The best time to catch construction issues.',
      icon: 'Layout',
      featured: false,
      order: 17,
      benefits: [
        'Catch issues before walls close',
        'Verify code compliance',
        'Document construction quality',
        'Peace of mind',
        'Easy fixes now vs. expensive later'
      ],
      process: [
        'Schedule during construction',
        'Framing and systems inspection',
        'Photo documentation',
        'Builder communication',
        'Follow-up verification'
      ],
      pricing: 'Starting at $300',
      duration: '2-3 hours',
      metaTitle: 'Pre-Drywall Inspection Tampa | New Construction',
      metaDescription: 'Pre-drywall inspections for new construction in Tampa Bay. Catch issues before walls are closed up.'
    },
    {
      name: 'Water Quality Testing',
      slug: 'water-quality-testing',
      shortDescription: 'Comprehensive water testing for bacteria, contaminants, and water quality.',
      fullDescription: 'Water quality testing is essential for homes with well water or concerns about municipal water. We test for bacteria, heavy metals, chemicals, and other contaminants. Lab analysis provides detailed results and recommendations.',
      icon: 'Droplets',
      featured: false,
      order: 18,
      benefits: [
        'Detect harmful bacteria',
        'Identify heavy metals and contaminants',
        'Lab-certified analysis',
        'Health and safety assurance',
        'Required for well water systems'
      ],
      process: [
        'Schedule water quality test',
        'Collect water samples',
        'Lab analysis for contaminants',
        'Receive detailed results',
        'Recommendations provided'
      ],
      pricing: 'Starting at $150',
      duration: '1 hour',
      metaTitle: 'Water Quality Testing Tampa Bay | Well Water Testing',
      metaDescription: 'Professional water quality testing in Tampa Bay. Lab analysis for bacteria, heavy metals, and contaminants. Essential for Florida well water systems.'
    },
    {
      name: 'Seawall Inspection',
      slug: 'seawall-inspection',
      shortDescription: 'Structural assessment of seawalls for waterfront properties.',
      fullDescription: 'Seawall inspections are critical for Tampa Bay waterfront properties. We assess structural integrity, identify erosion, cracks, deterioration, and potential failure points. Essential for protecting your waterfront investment.',
      icon: 'Waves',
      featured: false,
      order: 19,
      benefits: [
        'Prevent costly seawall failure',
        'Identify erosion and deterioration',
        'Protect property value',
        'Safety assessment',
        'Photo documentation included'
      ],
      process: [
        'Schedule seawall inspection',
        'Visual and structural assessment',
        'Identify cracks and erosion',
        'Photo documentation',
        'Repair recommendations'
      ],
      pricing: 'Starting at $200',
      duration: '1-2 hours',
      metaTitle: 'Seawall Inspection Tampa Bay | Waterfront Property',
      metaDescription: 'Professional seawall inspections for Tampa Bay waterfront properties. Structural assessment, erosion detection, and repair recommendations.'
    },
    {
      name: 'Boat Lift Inspection',
      slug: 'boat-lift-inspection',
      shortDescription: 'Safety and functionality inspection of boat lift systems.',
      fullDescription: 'Boat lift inspections evaluate motors, cables, electrical systems, and structural components for safety and functionality. Essential for waterfront properties with boat lifts in Tampa Bay.',
      icon: 'Anchor',
      featured: false,
      order: 20,
      benefits: [
        'Safety verification',
        'Motor and cable assessment',
        'Electrical system check',
        'Prevent equipment failure',
        'Peace of mind'
      ],
      process: [
        'Schedule boat lift inspection',
        'Motor and cable evaluation',
        'Electrical system assessment',
        'Operational testing',
        'Detailed findings report'
      ],
      pricing: 'Starting at $150',
      duration: '1 hour',
      metaTitle: 'Boat Lift Inspection Tampa Bay | Marine Equipment',
      metaDescription: 'Professional boat lift inspections in Tampa Bay. Safety and functionality assessment for waterfront properties.'
    },
    {
      name: 'Dock Inspection',
      slug: 'dock-inspection',
      shortDescription: 'Structural safety inspection of docks and piers.',
      fullDescription: 'Dock inspections assess structural integrity, decking condition, pilings, and safety features. Critical for Tampa Bay waterfront properties to ensure safe access to boats and watercraft.',
      icon: 'Construction',
      featured: false,
      order: 21,
      benefits: [
        'Structural safety verification',
        'Identify wood rot and damage',
        'Piling assessment',
        'Prevent accidents',
        'Comprehensive photo documentation'
      ],
      process: [
        'Schedule dock inspection',
        'Structural integrity evaluation',
        'Decking and piling assessment',
        'Safety feature check',
        'Detailed report with photos'
      ],
      pricing: 'Starting at $150',
      duration: '1 hour',
      metaTitle: 'Dock Inspection Tampa Bay | Pier Safety Assessment',
      metaDescription: 'Professional dock and pier inspections in Tampa Bay. Structural safety assessment for waterfront properties.'
    }
  ];

  for (const serviceData of servicesData) {
    await prisma.service.upsert({
      where: { slug: serviceData.slug },
      update: {},
      create: serviceData,
    });
  }
  console.log(`✅ Created ${servicesData.length} services`);

  // Create testimonials from Google Reviews
  console.log('Creating testimonials...');
  const testimonialsData = [
    {
      reviewerName: 'Joe gallucci',
      rating: 5,
      reviewText: 'Great experience!! Jen is the BEST!! On time and very knowledgeable & professional! I would highly recommend Properly Inspected to everyone. You will not be disappointed.',
      service: 'Home Inspection',
      location: 'Tampa Bay',
      date: new Date('2024-11-14'),
      source: 'google',
      featured: true,
      verified: true
    },
    {
      reviewerName: 'Alex Caballero',
      rating: 5,
      reviewText: 'I always know my clients are in good hands when we hire Lloyd and his team. High quality experts that always give such good advice and direction about the condition of the home.',
      service: 'Buyer\'s Inspection',
      location: 'Tampa Bay',
      date: new Date('2024-10-14'),
      source: 'google',
      featured: true,
      verified: true,
      badge: 'Real Estate Professional'
    },
    {
      reviewerName: 'Aldo Servello',
      rating: 5,
      reviewText: 'Lloyd was very responsive and worked around the builder\'s completion schedule to perform a thorough job. He answered my follow up questions and provided excellent service throughout the process',
      service: 'New Construction Inspection',
      location: 'Tampa Bay',
      date: new Date('2024-09-14'),
      source: 'google',
      featured: true,
      verified: true
    },
    {
      reviewerName: 'Matt Schoenfeld',
      rating: 5,
      reviewText: 'As an agent Lloyd is my go to for a home inspection, he is always professional and does a wonderful job for my clients. Highly Recommended!!!!!',
      service: 'Home Inspection',
      location: 'Tampa Bay',
      date: new Date('2024-11-14'),
      source: 'google',
      featured: true,
      verified: true,
      badge: 'Real Estate Professional'
    },
    {
      reviewerName: 'Marsha Polin',
      rating: 5,
      reviewText: 'A job well done! Results were gotten within a few hours. Thank you. Also Lloyd came out to do the inspection within a day. Prompt service.',
      service: 'Home Inspection',
      location: 'Tampa Bay',
      date: new Date('2024-09-14'),
      source: 'google',
      featured: false,
      verified: true
    },
    {
      reviewerName: 'Anonymous Reviewer',
      rating: 5,
      reviewText: 'Very thorough and detailed, and you receive the results very quickly.',
      service: 'Home Inspection',
      location: 'Tampa Bay',
      date: new Date('2024-11-14'),
      source: 'google',
      featured: false,
      verified: true
    },
    {
      reviewerName: 'Anonymous Reviewer',
      rating: 5,
      reviewText: 'Lloyd was so helpful and was great to work with for our property inspection. His attention to detail was amazing and was able to get out to our property on a very tight schedule.',
      service: 'Property Inspection',
      location: 'Tampa Bay',
      date: new Date('2024-11-14'),
      source: 'google',
      featured: false,
      verified: true
    }
  ];

  for (const testimonialData of testimonialsData) {
    await prisma.testimonial.create({
      data: testimonialData,
    });
  }
  console.log(`✅ Created ${testimonialsData.length} testimonials`);

  // Create locations
  console.log('Creating locations...');
  const locationsData = [
    {
      city: 'Odessa',
      state: 'FL',
      slug: 'odessa-fl',
      county: 'Pasco',
      description: 'Professional home inspection services in Odessa, Florida. Lloyd Tillmann provides certified inspections with 360° photos, same-day reports, and 11 month warranty.',
      neighborhoods: ['Keystone', 'Starkey Ranch', 'Seven Oaks'],
      commonIssues: ['New construction settling', 'HVAC efficiency in Florida heat', 'Moisture intrusion'],
      metaTitle: 'Home Inspector Odessa FL | Certified Home Inspection Services',
      metaDescription: 'Professional home inspector in Odessa, FL. Certified InterNACHI inspector with 360° photos, same-day reports. Serving Keystone, Starkey Ranch, Seven Oaks.',
      order: 1
    },
    {
      city: 'Westchase',
      state: 'FL',
      slug: 'westchase-tampa',
      county: 'Hillsborough',
      description: 'Trusted home inspection services in Westchase, Tampa. Comprehensive inspections for this upscale master-planned community.',
      neighborhoods: ['Westchase proper', 'Countryway', 'Legends'],
      commonIssues: ['Aging HVAC systems', 'Roof wear from Florida sun', 'Pool equipment maintenance'],
      metaTitle: 'Home Inspector Westchase Tampa | Professional Inspections',
      metaDescription: 'Westchase home inspector serving Tampa Bay. Thorough inspections for Westchase, Countryway, and Legends neighborhoods.',
      order: 2
    },
    {
      city: 'Palm Harbor',
      state: 'FL',
      slug: 'palm-harbor',
      county: 'Pinellas',
      description: 'Experienced home inspector serving Palm Harbor, Florida. Specializing in both older and newer construction with attention to coastal concerns.',
      neighborhoods: ['Lansbrook Village', 'Sutherland', 'Innisbrook'],
      commonIssues: ['Older electrical systems', 'Foundation concerns', 'Roof age', 'Coastal humidity impacts'],
      metaTitle: 'Home Inspector Palm Harbor FL | Certified & Experienced',
      metaDescription: 'Palm Harbor home inspection services. Expert evaluation of older and newer homes in Lansbrook, Sutherland, and Innisbrook areas.',
      order: 3
    },
    {
      city: 'Trinity',
      state: 'FL',
      slug: 'trinity-fl',
      county: 'Pasco',
      description: 'New construction and existing home inspections in Trinity, Florida. Protecting buyers in this rapidly growing community.',
      neighborhoods: ['Trinity Lakes', 'Seven Oaks', 'Fox Hollow'],
      commonIssues: ['Builder quality variations', 'New home defects', 'Warranty inspection importance'],
      metaTitle: 'Home Inspector Trinity FL | New Construction Specialist',
      metaDescription: 'Trinity FL home inspector specializing in new construction. 11th month warranty inspections for Trinity Lakes, Seven Oaks, Fox Hollow.',
      order: 4
    },
    {
      city: 'Clearwater',
      state: 'FL',
      slug: 'clearwater',
      county: 'Pinellas',
      description: 'Clearwater home inspection services with expertise in coastal properties. 4-point and wind mitigation inspections available.',
      neighborhoods: ['Clearwater Beach', 'Safety Harbor', 'Countryside'],
      commonIssues: ['Salt air corrosion', 'Wind damage potential', 'Older infrastructure', 'Insurance requirements'],
      metaTitle: 'Home Inspector Clearwater FL | Coastal Home Specialist',
      metaDescription: 'Clearwater home inspector with coastal property expertise. 4-point, wind mitigation, and comprehensive inspections available.',
      order: 5
    },
    {
      city: 'Tarpon Springs',
      state: 'FL',
      slug: 'tarpon-springs',
      county: 'Pinellas',
      description: 'Historic home inspection specialist serving Tarpon Springs. Thorough evaluations of character homes and waterfront properties.',
      neighborhoods: ['Downtown Tarpon Springs', 'Anclote', 'Lake Tarpon'],
      commonIssues: ['Older home thorough inspection needs', 'Moisture concerns', 'Historic preservation considerations'],
      metaTitle: 'Home Inspector Tarpon Springs FL | Historic Home Expert',
      metaDescription: 'Tarpon Springs home inspector specializing in historic homes and waterfront properties. Serving downtown, Anclote, Lake Tarpon areas.',
      order: 6
    },
    {
      city: 'St. Petersburg',
      state: 'FL',
      slug: 'st-petersburg',
      county: 'Pinellas',
      description: 'St. Petersburg home inspection services for urban properties, historic homes, and downtown condos. Certified and thorough.',
      neighborhoods: ['Downtown St. Pete', 'Historic Kenwood', 'Old Northeast', 'Shore Acres'],
      commonIssues: ['Historic home renovations', 'Condo inspections', 'Coastal impacts', 'Urban property concerns'],
      metaTitle: 'Home Inspector St. Petersburg FL | Urban & Historic Homes',
      metaDescription: 'St. Petersburg home inspector for urban properties, historic homes, condos. Serving downtown, Kenwood, Old Northeast, Shore Acres.',
      order: 7
    }
  ];

  for (const locationData of locationsData) {
    await prisma.location.upsert({
      where: { slug: locationData.slug },
      update: {},
      create: locationData,
    });
  }
  console.log(`✅ Created ${locationsData.length} locations`);

  // Create FAQs
  console.log('Creating FAQs...');
  const faqsData = [
    {
      question: 'What is a home inspection?',
      answer: 'A home inspection is a comprehensive evaluation of a property\'s condition, examining major systems and components including the roof, foundation, electrical, plumbing, HVAC, and more. Our certified inspector Lloyd Tillmann provides a detailed report identifying any issues or concerns.',
      category: 'General',
      order: 1
    },
    {
      question: 'How much does a home inspection cost in Tampa Bay?',
      answer: 'Home inspection costs in Tampa Bay typically range from $300-$500 for a standard single-family home, depending on size, age, and additional services. At Properly Inspected, we provide transparent pricing and detailed quotes based on your specific property. Contact us at (727) 425-6300 for an exact quote.',
      category: 'General',
      order: 2
    },
    {
      question: 'How long does a home inspection take?',
      answer: 'A typical home inspection takes 2-4 hours depending on the property size, age, and condition. Larger homes or properties with complex systems may require additional time. We never rush - thoroughness is our priority.',
      category: 'General',
      order: 3
    },
    {
      question: 'What is included in a home inspection?',
      answer: 'Our comprehensive inspection covers the roof, foundation, structure, exterior, interior, electrical system, plumbing, HVAC, insulation, ventilation, appliances, and more. We use advanced tools including thermal imaging, moisture meters, and 360° photo technology.',
      category: 'General',
      order: 4
    },
    {
      question: 'Should I be present during the inspection?',
      answer: 'We encourage buyers to attend the final hour of the inspection. This allows you to ask questions, see issues firsthand, and better understand your future home. We\'ll walk you through our findings and provide maintenance recommendations.',
      category: 'General',
      order: 5
    },
    {
      question: 'When will I receive my inspection report?',
      answer: 'We deliver reports within 24 hours, often the same day. Our reports are mobile-friendly, include photos, and feature 360° virtual photos so you can revisit any area of the property anytime.',
      category: 'General',
      order: 6
    },
    {
      question: 'Can a home fail an inspection?',
      answer: 'Homes don\'t technically "fail" inspections. Our role is to inform you of the property\'s condition. Almost every home has issues - the question is whether they\'re deal-breakers or negotiable. We help you make informed decisions.',
      category: 'General',
      order: 7
    },
    {
      question: 'What makes Properly Inspected different?',
      answer: 'We offer unique 360° virtual photos, same-day report delivery, 11 month warranty protection, and advanced tools like thermal imaging and drones. Lloyd Tillmann is Florida-licensed (HI13452), InterNACHI certified, and a licensed Mold Assessor.',
      category: 'About Us',
      order: 1
    },
    {
      question: 'What are Lloyd Tillmann\'s qualifications?',
      answer: 'Lloyd Tillmann holds Florida Home Inspector License #HI13452, Florida Mold Assessor License #MRSA5241, InterNACHI Certified Professional Inspector (CPI), and IAC2 Indoor Air Quality Certified Consultant. He has 10+ years of experience serving Tampa Bay.',
      category: 'About Us',
      order: 2
    },
    {
      question: 'What is your 11 month warranty?',
      answer: 'Our Complete Protection Warranty covers appliances and major systems for 11 months after your inspection. It includes 100% parts and labor with no deductible, giving you peace of mind after closing.',
      category: 'About Us',
      order: 3
    },
    {
      question: 'What are 360° photos and how do they help?',
      answer: '360° photos allow you to virtually walk through your inspection from your computer or phone. You can revisit any room, show family members who couldn\'t attend, and review details anytime - it\'s like being there again.',
      category: 'About Us',
      order: 4
    },
    {
      question: 'What is a 4-point inspection?',
      answer: 'A 4-point inspection evaluates four major systems: roof, electrical, plumbing, and HVAC. Required by most Florida insurance companies for homes over 25 years old, it assesses age, condition, and remaining useful life.',
      category: 'Specialized Inspections',
      order: 1
    },
    {
      question: 'What is a wind mitigation inspection?',
      answer: 'A wind mitigation inspection documents your home\'s wind-resistant features to potentially reduce insurance premiums by 10-45%. It evaluates roof shape, roof-to-wall connections, roof deck attachment, and opening protection.',
      category: 'Specialized Inspections',
      order: 2
    },
    {
      question: 'How much money can wind mitigation save on insurance?',
      answer: 'Wind mitigation can save 10-45% annually on Florida homeowners insurance. For a typical Tampa Bay home with $2,000/year premiums, that\'s $200-900 in annual savings. The inspection pays for itself in the first year.',
      category: 'Specialized Inspections',
      order: 3
    },
    {
      question: 'Do I need a new construction inspection?',
      answer: 'Absolutely! Builders make mistakes, and construction defects are common even in quality homes. New construction inspections catch issues while they\'re still under warranty, potentially saving thousands in repairs.',
      category: 'Specialized Inspections',
      order: 4
    },
    {
      question: 'What is a pre-listing inspection?',
      answer: 'A pre-listing inspection is performed before selling your home. It helps sellers identify issues upfront, price accurately, avoid last-minute surprises, and negotiate from a position of strength.',
      category: 'Specialized Inspections',
      order: 5
    },
    {
      question: 'How do I schedule an inspection?',
      answer: 'Call us at (727) 425-6300 or (727) 798-6480, or schedule online at our website. We offer same-day and next-day appointments based on availability.',
      category: 'Scheduling',
      order: 1
    },
    {
      question: 'Do you offer weekend inspections?',
      answer: 'Yes! We offer flexible scheduling including weekends and evenings to accommodate your schedule.',
      category: 'Scheduling',
      order: 2
    },
    {
      question: 'How far in advance should I book?',
      answer: 'We recommend booking as soon as your inspection contingency period begins. We often have same-day or next-day availability, but popular time slots fill quickly.',
      category: 'Scheduling',
      order: 3
    }
  ];

  for (const faqData of faqsData) {
    await prisma.fAQ.create({
      data: faqData,
    });
  }
  console.log(`✅ Created ${faqsData.length} FAQs`);

  // Create blog posts
  console.log('Creating blog posts...');
  const blogPostsPath = path.join(__dirname, '..', '..', 'blog_posts.json');
  const blogPostsContent = fs.readFileSync(blogPostsPath, 'utf-8');
  const blogPostsData = JSON.parse(blogPostsContent);

  for (const post of blogPostsData.posts) {
    await prisma.blogPost.create({
      data: {
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        category: post.category,
        tags: post.tags,
        metaTitle: post.metaTitle,
        metaDescription: post.metaDescription,
        coverImage: post.featuredImage || null,
        published: true,
        featured: true,
        authorId: admin.id,
        publishedAt: new Date(),
      },
    });
  }
  console.log(`✅ Created ${blogPostsData.posts.length} blog posts`);

  console.log('✨ Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
