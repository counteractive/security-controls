# Security Controls

## About

Information security controls frameworks are a bit of a mess, with multiple hard-to-parse formats and inconsistent structures describing similar goals.  This project aspires to help users:

1. Easily obtain clean, consistent controls information from one place
1. Easily search, manipulate, and use controls information
1. Map controls across frameworks
1. Easily share controls information with other tools and platforms

... and more.

### Risk-Focused

This project is designed to support a thoughtful risk management strategy where security moves beyond mere "compliance" (or "maturity") and into _risk mitigation_.  Controls decisions and priorities should consider the full risk equation and avoid "box-checking."

> ```text
> risk = impact x likelihood
> risk = (functional_impact + info_impact) x (threat x vulnerability)
> risk =   (functional_impact + info_impact - controls_effect)
>        x (threat x (vulnerability - controls_effect))
> ```

## Controls (_a.k.a._, actions, requirements, outcomes)

### Control Frameworks

ID |Framework | URL | Version |  Notes
-- | -- | -- | -- | --
`nist_csf_v1.1` | National Institute for Standards and Technology (NIST) Framework for Improving Critical Infrastructure Cybersecurity | [NIST CSF](https://www.nist.gov/cyberframework) | 1.1 |
`cis_csc_7.1` | Center for Internet Security (CIS) Controls | [CIS CSC](http://www.cisecurity.org/controls/) | 7.1 | _a.k.a._, Critical Security Controls, Top 20
`800_53_v4` | NIST Security and Privacy Controls for Federal Information Systems and Organizations | [NIST 800-53](https://csrc.nist.gov/publications/detail/sp/800-53/rev-4/final) | 4 |
`800_171_v1` | Protecting Controlled Unclassified Information in Nonfederal Systems and Organizations | [NIST 800-171](https://csrc.nist.gov/publications/detail/sp/800-171/rev-1/final) | 1 |
`owasp_10_v3` | Open Web Application Security Project (OWASP) Top Ten Proactive Controls 2018 | [OWASP Top 10](https://owasp.org/www-project-proactive-controls/) | 3 | Distinct from [OWASP Top 10 Security Risks](https://owasp.org/www-project-top-ten/)
`asvs_v4.0.1` | OWASP Application Security Verification Standard | [ASVS](https://owasp.org/www-project-application-security-verification-standard/) | 4.0.1 |
`fsscc_profile_v1.0` | Financial Services Sector Coordinating Council (FSSCC) Profile | [FSSCC](https://fsscc.org/The-Profile-FAQs) | 1.0 |
`ffiec_cat_v2017.05` | Federal Financial Institutions Examination Council (FFIEC) Cybersecurity Assessment Tool | [FFIEC](https://www.ffiec.gov/cyberassessmenttool.htm) | 2017.05 (May, 2017) | Only includes maturity domains; risk profiles are excluded as they do not fit within the framework of this project
`aicpa_tsc_v2017` | AICPA Trust Services Criteria (SOC2 / SOC3) | [AICPA](https://www.aicpa.org/content/dam/aicpa/interestareas/frc/assuranceadvisoryservices/downloadabledocuments/trust-services-criteria.pdf) | 2017 |

### Control Format

All controls are standardized to capture the following fields:

Field | Description | Example
-- | -- | --
`source` | framework from which the item was drawn, using the ID listed above | `nist_csf_v1.1`
`id_raw` | identifier for the item drawn from the source (may not be globally unique), in its original format | `RS.MI`
`id` | globally unique (namespaced) identifier created by combining `source` with lowercase, no-spaces `id_raw` | `nist_csf_v1.1:rs.mi`
`tier_raw` | tier (group) for the item drawn from the source (may not be globally unique or consistent), in its original format | `Category`
`tier` | 0-based level in the hierarchy of the original framework (_i.e._, the number of ancestors for this item) | `1`
`seq` | strictly increasing sequence number capturing the order of controls within a tier of a framework (optional), drawn from the source | `3`
`title` | short description of the item (optional), in its original format | `Mitigation`
`description` | long description of the item (optional), in its original format | `Activities are performed ...`

## Relationships (_e.g._, equivalence, hierarchy, association)

### Relationship Types

Relationships ("mappings") contain their [Simple Knowledge Organization System (SKOS) mapping type](https://www.w3.org/TR/2009/REC-skos-reference-20090818/#mapping), one of the following:

Type | SKOS Type | Properties | Notes
-- | -- | -- | --
Hierarchical | `skos:broadMatch`, `skos:narrowMatch` | transitive, each is the other's inverse | `dog skos:broadMatch mammal` ("is specific example of"), `mammal skos:narrowMatch dog` ("is generic category including").  **Only capture one level of ancestry** if possible, as the rest can be inferred through transitivity.
Associative | `skos:relatedMatch` | non-transitive, symmetric (bidirectional) | generic, _non-hierarchical_ relationship
Close equivalent | `skos:closeMatch` | non-transitive, symmetric (bidirectional) | "concepts ... sufficiently similar that they can be used interchangeably _in some [applications]_"
Exact equivalent | `skos:exactMatch` | transitive, symmetric (bidirectional) |"two concepts ... that can be used interchangeably _[in many applications]_"

### Relationship Format

All relationships are standardized to capture the following fields:

Field | Description | Example
-- | -- | --
`source` | framework from which the relationship was drawn, using the ID listed above, or `community` for those drawn from community input | `nist_csf_v1.1`
`head` | `id` of the first endpoint (control, item) in this relationship; by convention (optionally), for non-directional relationship to another framework, this is the item from `source` | `nist_csf_v1.1:rs.co-3`
`tail` | `id` of the second endpoint (control, item) in this relationship | `nist_800_53_v4:ir-4`
`type_raw` |  type for the relationship from the source (may not be globally unique), in its original format; leave blank for outline-based hierarchies or other non-explicit relationship types | `Informative Reference`
`type_skos` | [SKOS mapping type](https://www.w3.org/TR/2009/REC-skos-reference-20090818/#mapping) for the relationship, which captures its directionality, transitivity, and symmetry | `skos:relatedMatch`
~~`id`~~ | ~~globally unique identifier, likely necessary, but nothing semantic comes to mind right away~~ | ~~TBD~~

## Labels (_a.k.a._, tags, metadata)

TODO

## Notes

* Hierarchical groups of controls are captured as higher-tier controls, even when not explicitly described that way in the source (_e.g._, CIS CSC implementation groups).  When a set of controls is defined by some cross-cutting aspect of the controls (_e.g._, 800-171 basic vs. derived requirements, or CIS CSC asset types) rather than a hierarchy, this is captured using labels.
* This project maintains format from the source document(s) in order to comply with licenses and avoid becoming a copy-editing nightmare.  This means data retains capitalization artifacts, style inconsistencies, and typographical errors, among other issues.  Proposed fixes should first determine if the issue is present in the underlying source (in which case, it will likely remain by design, and to comply with license terms).
* This approach clearly leaves out useful information from each framework, but benefits from simplicity and consistency.  This project emphasizes these values over comprehensiveness.
* Items deeper than tier-2 are wrapped into their nearest tier 2 ancestor (_e.g._, `800_53_v4` tier-3 items `AC-2h.1.`, `AC-2h.2.`, `AC-2h.3.` are included in tier-2 item `AC-2h.`).
* "Withdrawn" controls in `800_53_v4` do not appear in the consolidated data.
* Leading and trailing spaces were removed in consolidated data.
* Because of disclaimers in the source material, there's often not much more than an associative match (`skos:relatedMatch`) that we can pull from the text itself.  Take the following from the NIST CSF: "Mappings between the Framework Core Subcategories and the specified sections in the Informative References are not intended to definitively determine whether the specified sections in the Informative References provide the desired Subcategory outcome."  That is, you could do all those things and still not have what we're looking for.  Or maybe you would.  Good luck.
* **DISCLAIMER:** Much of the initial consolidation was done by hand with the assistance of good old Excel.  There are likely transcription errors.  Please create an issue or pull request if you identify a problem.

## Use Cases

The data and tools in this project can support:

1. Efficiency and cost savings by avoiding duplication of effort across multiple departments (_e.g._, security operations and product development)
1. Prioritizing controls based on cross-framework coverage (pareto principal).  For example:
    1. NIST 800-53 has 256 distinct tier-1 controls (the lowest level that maps directly to the NIST CSF, useful because they get more detailed than the sub-categories).  Of those, the NIST CSF only references 212, leaving 44 that maybe don't move the needle if NIST CSF is your governance model of choice.
    1. It's a long-tail distribution too: the top four related controls (`nist_800_53_v4:cp-2`, `nist_800_53_v4:ir-4`, `nist_800_53_v4:ca-7`, `nist_800_53_v4:si-4`, and `nist_800_53_v4:ir-8`) show up 91 times out of 508 total mappings - effort on just four controls helps advance over 20% of the "Informative References" across the entire NIST CSF.  On the other end, implementing the **107** controls that show up just once gets you similar coverage.
1. Choosing an initial framework for a new or re-built security program.
1. Transitions from one regime to another (_e.g._, due to an acquisition or initiative)
1. Integrating controls information into task tracking, ticketing, planning, and [GRC](https://en.wikipedia.org/wiki/Governance,_risk_management,_and_compliance) tools (e.g., Archer, SAP, github/gitlab, JIRA, Zendesk)
1. Integrating controls information into operations tools like log aggregators, SIEMs, visualization tools, and orchestration platforms (_e.g._, Elastic Stack, Splunk, Demisto, Phantom)
1. Visualizing coverage and progress towards goals
1. Prioritizing controls based on the **threat** component of risk (_e.g._, in concert with threat intelligence and adversary activity taxonomies like [MITRE ATT&CK](https://attack.mitre.org/) or [CAPEC](https://capec.mitre.org/))
1. Prioritizing controls based on business, mission, regulatory, and legal **impact** components of risk (_e.g._, using lists of critical assets, information, and accounts)
1. Prioritizing controls based on the **vulnerability** component of risk
1. Prioritizing controls based on the confidentiality, integrity, and availability requirements of assets and information

## Frequently Asked Questions (FAQ)

* **Why do you mix application security and organizational/corporate information security frameworks?** Our master list strives to include all reputable information security controls, across a wide variety of domains.  We support the use of [labels](#labels) to add metadata to controls, and if that distinction is important to your team, we encourage you to capture it within the mode.  More broadly: different organizations assign security responsibilities differently, and for many firms their applications _are_ their entire organization.  There's often no meaningful distinction in the world of small business, DevSecOps, or integrated IT/security teams - the same people are responsible for most of it!

* **How did you choose the relationships (mappings)?** We created initial mappings based on the source documents themselves (_i.e._, they say X maps to Y), as well as a good-faith effort to apply the relationships ("mappings") in the [Simple Knowledge Organization System (SKOS)](https://www.w3.org/TR/2009/REC-skos-reference-20090818/), as noted above. In so many cases it's a matter of judgment and usability - if you think X should be mapped to Y, please open an issue or pull request and we can discuss it!  Because relationships have metadata, you can also create and use your own without breaking anything.

* **What is the easiest way to update this data?** We find working with the CSV the most straightforward, using Excel or Libre Office Calc.  You can then produce the other formats (`jsonl` and `json`) using free command-line tools like [`csvkit`](https://csvkit.readthedocs.io/en/latest/tutorial.html) and [`jq`](https://stedolan.github.io/jq/):

  ```bash
  # pip3 install csvkit
  $ csvjson controls.csv | jq -c '.[]' > controls.jsonl
  $ jq -s '.' controls.jsonl > controls.json
  ```

* **Why isn't this in a database?** Text files are universal and CSV and JSON cover a lot of use-cases, both technical and non-technical.  If you want a database-like experience, you can import them into your DB of choice, or use a [tool like `q`](http://harelba.github.io/q/) which lets you run SQL queries on text files:

  ```bash
  $ q -H -d , "select id, title, description from ./controls.csv where id like '%csf%' and tier = 0"
  # nist_csf_v1.1:de,Detect,Develop and implement appropriate ...
  # nist_csf_v1.1:id,Identify,Develop an organizational understanding ...
  # nist_csf_v1.1:pr,Protect,Develop and implement appropriate ...
  # nist_csf_v1.1:rc,Recover,Develop and implement appropriate ...
  # nist_csf_v1.1:rs,Respond,Develop and implement appropriate ...
  ```

  The JSON formats make it straightforward to work with the data programmatically:

  ```javascript
  const _ = require('lodash')
  const controls = require('./controls.json')
  const relationships = require('./relationships.json')
  // go to town ...
  ```

## References and Prior Art

* [Open Control](https://github.com/opencontrol)
* See [NOTICE](NOTICE) for additional source material and references

## Roadmap

* [x] Publish clean, consistent controls framework data
* [x] Determine mapping approach using SKOS, ISO 25964-2 and source documents
* [x] Capture hierarchical mappings for NIST CSF
* [x] Capture associative mappings for NIST CSF to 800-53 (from CSF source xml)
* [x] Capture associative mappings for NIST CSF to CIS CSC (from NIST CSF source)
* [x] Capture hierarchical mappings for CIS CSC (excluding implementation groups)
* [x] Capture implementation groups for CIS CSC
* [x] Add an optional sequence number for controls at a tier (within a framework) for in-source ordering
* [x] Add all sequence numbers for NIST CSF, CIS CSC, and 800-171
* [x] Add all sequence numbers for NIST 800-53
* [ ] POC for visualization capabilities
* [ ] Tool for capturing/editing relationships
* [ ] Capture associative mappings for CIS CSC to NIST CSF (from CIS CSC source)
* [ ] Capture hierarchical mappings for 800-53
* [ ] Capture hierarchical mappings for ASVS
* [ ] Capture equivalence and associative mappings for 800-171 to 800-53
* [ ] Capture equivalence and associative mappings for CIS CSC to NIST 800-53
* [ ] Consider ways to include adversary activity taxonomies (_e.g._, [ATT&CK](https://attack.mitre.org/), [OWASP Top 10 Security Risks](https://owasp.org/www-project-top-ten/), [CAPEC](https://capec.mitre.org/))
* [ ] Consider including additional frameworks like PCI/DSS, ISO 2700X, COBIT, ITIL, HIPAA/HITRUST, FedRAMP

## License and Notice

**Controls information is copyright its respective creator and used according its respective license.** See the [NOTICE](NOTICE) file for details on each source.  These licenses include:

* [Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International Public License](https://creativecommons.org/licenses/by-nc-nd/4.0/legalcode) (_e.g._, for items marked `cis_csc_v7.1`)
* [Creative Commons Attribution ShareAlike 3.0](https://creativecommons.org/licenses/by-sa/3.0/legalcode) (e.g., for items marked `asvs_`)
* [Public domain and not subject to copyright in the United States](https://www.nist.gov/nist-research-library/library-faqs) (_e.g._, for items marked `nist_`)
* [Creative Commons Attribution-ShareAlike 4.0 International Public License](https://creativecommons.org/licenses/by-sa/4.0/legalcode) (_e.g._, for items marked `owasp_10_`)

Original assets are Copyright 2020 Counteractive Security and licensed under the Apache License, Version 2.0 (the "License"); you may not use this work except in compliance with the License. You should have received a [copy of the license](LICENSE) along with this work, and you may obtain a copy of the License [here](http://www.apache.org/licenses/LICENSE-2.0).

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

## Changelog

Version | Release Date | Notes
-- | -- | --
N/A  | N/A | Pre-release
