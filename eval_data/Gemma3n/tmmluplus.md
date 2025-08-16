## Gemma-3n-E4B-IT-BF16

|                       Tasks                        |Version|     Filter     |n-shot|  Metric   |   |Value |   |Stderr|
|----------------------------------------------------|------:|----------------|-----:|-----------|---|-----:|---|-----:|
|gsm8k                                               |      3|flexible-extract|     5|exact_match|↑  |0.7111|±  |0.0125|
|                                                    |       |strict-match    |     5|exact_match|↑  |0.6391|±  |0.0132|
|tmmluplus                                           |      2|none            |      |acc        |↑  |0.3431|±  |0.0033|
|                                                    |       |none            |      |acc_norm   |↑  |0.3431|±  |0.0033|
| - tmmluplus_STEM                                   |      2|none            |      |acc        |↑  |0.3246|±  |0.0079|
|                                                    |       |none            |      |acc_norm   |↑  |0.3246|±  |0.0079|
|  - advance chemistry                               |      2|none            |     0|acc        |↑  |0.2846|±  |0.0408|
|                                                    |       |none            |     0|acc_norm   |↑  |0.2846|±  |0.0408|
|  - basic medical science                           |      2|none            |     0|acc        |↑  |0.3417|±  |0.0154|
|                                                    |       |none            |     0|acc_norm   |↑  |0.3417|±  |0.0154|
|  - computer science                                |      2|none            |     0|acc        |↑  |0.4425|±  |0.0378|
|                                                    |       |none            |     0|acc_norm   |↑  |0.4425|±  |0.0378|
|  - engineering math                                |      2|none            |     0|acc        |↑  |0.3010|±  |0.0454|
|                                                    |       |none            |     0|acc_norm   |↑  |0.3010|±  |0.0454|
|  - junior chemistry                                |      2|none            |     0|acc        |↑  |0.2967|±  |0.0317|
|                                                    |       |none            |     0|acc_norm   |↑  |0.2967|±  |0.0317|
|  - junior math exam                                |      2|none            |     0|acc        |↑  |0.2400|±  |0.0324|
|                                                    |       |none            |     0|acc_norm   |↑  |0.2400|±  |0.0324|
|  - junior science exam                             |      2|none            |     0|acc        |↑  |0.3192|±  |0.0320|
|                                                    |       |none            |     0|acc_norm   |↑  |0.3192|±  |0.0320|
|  - linear algebra                                  |      2|none            |     0|acc        |↑  |0.3571|±  |0.0748|
|                                                    |       |none            |     0|acc_norm   |↑  |0.3571|±  |0.0748|
|  - organic chemistry                               |      2|none            |     0|acc        |↑  |0.3119|±  |0.0446|
|                                                    |       |none            |     0|acc_norm   |↑  |0.3119|±  |0.0446|
|  - pharmacy                                        |      2|none            |     0|acc        |↑  |0.2890|±  |0.0230|
|                                                    |       |none            |     0|acc_norm   |↑  |0.2890|±  |0.0230|
|  - physics                                         |      2|none            |     0|acc        |↑  |0.2784|±  |0.0457|
|                                                    |       |none            |     0|acc_norm   |↑  |0.2784|±  |0.0457|
|  - secondary physics                               |      2|none            |     0|acc        |↑  |0.3214|±  |0.0443|
|                                                    |       |none            |     0|acc_norm   |↑  |0.3214|±  |0.0443|
|  - statistics and machine learning                 |      2|none            |     0|acc        |↑  |0.3438|±  |0.0318|
|                                                    |       |none            |     0|acc_norm   |↑  |0.3438|±  |0.0318|
|  - tve mathematics                                 |      2|none            |     0|acc        |↑  |0.2800|±  |0.0368|
|                                                    |       |none            |     0|acc_norm   |↑  |0.2800|±  |0.0368|
|  - tve natural sciences                            |      2|none            |     0|acc        |↑  |0.3561|±  |0.0233|
|                                                    |       |none            |     0|acc_norm   |↑  |0.3561|±  |0.0233|
| - tmmluplus_humanities                             |      2|none            |      |acc        |↑  |0.3131|±  |0.0110|
|                                                    |       |none            |      |acc_norm   |↑  |0.3131|±  |0.0110|
|  - administrative law                              |      2|none            |     0|acc        |↑  |0.2833|±  |0.0220|
|                                                    |       |none            |     0|acc_norm   |↑  |0.2833|±  |0.0220|
|  - anti money laundering                           |      2|none            |     0|acc        |↑  |0.4552|±  |0.0432|
|                                                    |       |none            |     0|acc_norm   |↑  |0.4552|±  |0.0432|
|  - general principles of law                       |      2|none            |     0|acc        |↑  |0.2830|±  |0.0440|
|                                                    |       |none            |     0|acc_norm   |↑  |0.2830|±  |0.0440|
|  - introduction to law                             |      2|none            |     0|acc        |↑  |0.3038|±  |0.0299|
|                                                    |       |none            |     0|acc_norm   |↑  |0.3038|±  |0.0299|
|  - jce humanities                                  |      2|none            |     0|acc        |↑  |0.2778|±  |0.0475|
|                                                    |       |none            |     0|acc_norm   |↑  |0.2778|±  |0.0475|
|  - taxation                                        |      2|none            |     0|acc        |↑  |0.2907|±  |0.0235|
|                                                    |       |none            |     0|acc_norm   |↑  |0.2907|±  |0.0235|
|  - trust practice                                  |      2|none            |     0|acc        |↑  |0.3392|±  |0.0237|
|                                                    |       |none            |     0|acc_norm   |↑  |0.3392|±  |0.0237|
| - tmmluplus_other                                  |      2|none            |      |acc        |↑  |0.3345|±  |0.0049|
|                                                    |       |none            |      |acc_norm   |↑  |0.3345|±  |0.0049|
|  - accounting                                      |      2|none            |     0|acc        |↑  |0.2618|±  |0.0319|
|                                                    |       |none            |     0|acc_norm   |↑  |0.2618|±  |0.0319|
|  - agriculture                                     |      2|none            |     0|acc        |↑  |0.2848|±  |0.0368|
|                                                    |       |none            |     0|acc_norm   |↑  |0.2848|±  |0.0368|
|  - auditing                                        |      2|none            |     0|acc        |↑  |0.2655|±  |0.0188|
|                                                    |       |none            |     0|acc_norm   |↑  |0.2655|±  |0.0188|
|  - business management                             |      2|none            |     0|acc        |↑  |0.4748|±  |0.0425|
|                                                    |       |none            |     0|acc_norm   |↑  |0.4748|±  |0.0425|
|  - culinary skills                                 |      2|none            |     0|acc        |↑  |0.4281|±  |0.0290|
|                                                    |       |none            |     0|acc_norm   |↑  |0.4281|±  |0.0290|
|  - dentistry                                       |      2|none            |     0|acc        |↑  |0.3258|±  |0.0235|
|                                                    |       |none            |     0|acc_norm   |↑  |0.3258|±  |0.0235|
|  - finance banking                                 |      2|none            |     0|acc        |↑  |0.3481|±  |0.0412|
|                                                    |       |none            |     0|acc_norm   |↑  |0.3481|±  |0.0412|
|  - financial analysis                              |      2|none            |     0|acc        |↑  |0.3168|±  |0.0238|
|                                                    |       |none            |     0|acc_norm   |↑  |0.3168|±  |0.0238|
|  - fire science                                    |      2|none            |     0|acc        |↑  |0.2500|±  |0.0390|
|                                                    |       |none            |     0|acc_norm   |↑  |0.2500|±  |0.0390|
|  - insurance studies                               |      2|none            |     0|acc        |↑  |0.3237|±  |0.0170|
|                                                    |       |none            |     0|acc_norm   |↑  |0.3237|±  |0.0170|
|  - junior social studies                           |      2|none            |     0|acc        |↑  |0.3571|±  |0.0429|
|                                                    |       |none            |     0|acc_norm   |↑  |0.3571|±  |0.0429|
|  - logic reasoning                                 |      2|none            |     0|acc        |↑  |0.2806|±  |0.0382|
|                                                    |       |none            |     0|acc_norm   |↑  |0.2806|±  |0.0382|
|  - management accounting                           |      2|none            |     0|acc        |↑  |0.2837|±  |0.0308|
|                                                    |       |none            |     0|acc_norm   |↑  |0.2837|±  |0.0308|
|  - marketing management                            |      2|none            |     0|acc        |↑  |0.4516|±  |0.0519|
|                                                    |       |none            |     0|acc_norm   |↑  |0.4516|±  |0.0519|
|  - mechanical                                      |      2|none            |     0|acc        |↑  |0.5424|±  |0.0461|
|                                                    |       |none            |     0|acc_norm   |↑  |0.5424|±  |0.0461|
|  - music                                           |      2|none            |     0|acc        |↑  |0.3345|±  |0.0283|
|                                                    |       |none            |     0|acc_norm   |↑  |0.3345|±  |0.0283|
|  - nautical science                                |      2|none            |     0|acc        |↑  |0.3049|±  |0.0196|
|                                                    |       |none            |     0|acc_norm   |↑  |0.3049|±  |0.0196|
|  - official document management                    |      2|none            |     0|acc        |↑  |0.3559|±  |0.0322|
|                                                    |       |none            |     0|acc_norm   |↑  |0.3559|±  |0.0322|
|  - optometry                                       |      2|none            |     0|acc        |↑  |0.2924|±  |0.0150|
|                                                    |       |none            |     0|acc_norm   |↑  |0.2924|±  |0.0150|
|  - pharmacology                                    |      2|none            |     0|acc        |↑  |0.3969|±  |0.0204|
|                                                    |       |none            |     0|acc_norm   |↑  |0.3969|±  |0.0204|
|  - real estate                                     |      2|none            |     0|acc        |↑  |0.3261|±  |0.0491|
|                                                    |       |none            |     0|acc_norm   |↑  |0.3261|±  |0.0491|
|  - technical                                       |      2|none            |     0|acc        |↑  |0.4453|±  |0.0248|
|                                                    |       |none            |     0|acc_norm   |↑  |0.4453|±  |0.0248|
|  - trade                                           |      2|none            |     0|acc        |↑  |0.2590|±  |0.0196|
|                                                    |       |none            |     0|acc_norm   |↑  |0.2590|±  |0.0196|
|  - traditional chinese medicine clinical medicine  |      2|none            |     0|acc        |↑  |0.2662|±  |0.0266|
|                                                    |       |none            |     0|acc_norm   |↑  |0.2662|±  |0.0266|
|  - tve design                                      |      2|none            |     0|acc        |↑  |0.3896|±  |0.0223|
|                                                    |       |none            |     0|acc_norm   |↑  |0.3896|±  |0.0223|
|  - veterinary pathology                            |      2|none            |     0|acc        |↑  |0.2509|±  |0.0258|
|                                                    |       |none            |     0|acc_norm   |↑  |0.2509|±  |0.0258|
|  - veterinary pharmacology                         |      2|none            |     0|acc        |↑  |0.4167|±  |0.0212|
|                                                    |       |none            |     0|acc_norm   |↑  |0.4167|±  |0.0212|
| - tmmluplus_social_sciences                        |      2|none            |      |acc        |↑  |0.3756|±  |0.0062|
|                                                    |       |none            |      |acc_norm   |↑  |0.3756|±  |0.0062|
|  - chinese language and literature                 |      2|none            |     0|acc        |↑  |0.2864|±  |0.0321|
|                                                    |       |none            |     0|acc_norm   |↑  |0.2864|±  |0.0321|
|  - clinical psychology                             |      2|none            |     0|acc        |↑  |0.3280|±  |0.0422|
|                                                    |       |none            |     0|acc_norm   |↑  |0.3280|±  |0.0422|
|  - economics                                       |      2|none            |     0|acc        |↑  |0.3003|±  |0.0232|
|                                                    |       |none            |     0|acc_norm   |↑  |0.3003|±  |0.0232|
|  - education                                       |      2|none            |     0|acc        |↑  |0.4032|±  |0.0442|
|                                                    |       |none            |     0|acc_norm   |↑  |0.4032|±  |0.0442|
|  - education (profession level)                    |      2|none            |     0|acc        |↑  |0.2984|±  |0.0208|
|                                                    |       |none            |     0|acc_norm   |↑  |0.2984|±  |0.0208|
|  - educational psychology                          |      2|none            |     0|acc        |↑  |0.4205|±  |0.0373|
|                                                    |       |none            |     0|acc_norm   |↑  |0.4205|±  |0.0373|
|  - geography of taiwan                             |      2|none            |     0|acc        |↑  |0.4570|±  |0.0180|
|                                                    |       |none            |     0|acc_norm   |↑  |0.4570|±  |0.0180|
|  - human behavior                                  |      2|none            |     0|acc        |↑  |0.4401|±  |0.0283|
|                                                    |       |none            |     0|acc_norm   |↑  |0.4401|±  |0.0283|
|  - junior chinese exam                             |      2|none            |     0|acc        |↑  |0.2914|±  |0.0344|
|                                                    |       |none            |     0|acc_norm   |↑  |0.2914|±  |0.0344|
|  - macroeconomics                                  |      2|none            |     0|acc        |↑  |0.2822|±  |0.0222|
|                                                    |       |none            |     0|acc_norm   |↑  |0.2822|±  |0.0222|
|  - national protection                             |      2|none            |     0|acc        |↑  |0.4028|±  |0.0338|
|                                                    |       |none            |     0|acc_norm   |↑  |0.4028|±  |0.0338|
|  - occupational therapy for psychological disorders|      2|none            |     0|acc        |↑  |0.3499|±  |0.0205|
|                                                    |       |none            |     0|acc_norm   |↑  |0.3499|±  |0.0205|
|  - physical education                              |      2|none            |     0|acc        |↑  |0.4525|±  |0.0373|
|                                                    |       |none            |     0|acc_norm   |↑  |0.4525|±  |0.0373|
|  - politic science                                 |      2|none            |     0|acc        |↑  |0.4131|±  |0.0156|
|                                                    |       |none            |     0|acc_norm   |↑  |0.4131|±  |0.0156|
|  - taiwanese hokkien                               |      2|none            |     0|acc        |↑  |0.2481|±  |0.0382|
|                                                    |       |none            |     0|acc_norm   |↑  |0.2481|±  |0.0382|
|  - three principles of people                      |      2|none            |     0|acc        |↑  |0.6691|±  |0.0401|
|                                                    |       |none            |     0|acc_norm   |↑  |0.6691|±  |0.0401|
|  - ttqav2                                          |      2|none            |     0|acc        |↑  |0.6814|±  |0.0440|
|                                                    |       |none            |     0|acc_norm   |↑  |0.6814|±  |0.0440|
|  - tve chinese language                            |      2|none            |     0|acc        |↑  |0.2692|±  |0.0202|
|                                                    |       |none            |     0|acc_norm   |↑  |0.2692|±  |0.0202|

|           Groups           |Version|Filter|n-shot| Metric |   |Value |   |Stderr|
|----------------------------|------:|------|------|--------|---|-----:|---|-----:|
|tmmluplus                   |      2|none  |      |acc     |↑  |0.3431|±  |0.0033|
|                            |       |none  |      |acc_norm|↑  |0.3431|±  |0.0033|
| - tmmluplus_STEM           |      2|none  |      |acc     |↑  |0.3246|±  |0.0079|
|                            |       |none  |      |acc_norm|↑  |0.3246|±  |0.0079|
| - tmmluplus_humanities     |      2|none  |      |acc     |↑  |0.3131|±  |0.0110|
|                            |       |none  |      |acc_norm|↑  |0.3131|±  |0.0110|
| - tmmluplus_other          |      2|none  |      |acc     |↑  |0.3345|±  |0.0049|
|                            |       |none  |      |acc_norm|↑  |0.3345|±  |0.0049|
| - tmmluplus_social_sciences|      2|none  |      |acc     |↑  |0.3756|±  |0.0062|
|                            |       |none  |      |acc_norm|↑  |0.3756|±  |0.0062|
