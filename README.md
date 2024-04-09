# Chrome Extension Idea: AI Research Assistant

## Authors

Caroline Begg, Runzhi Gu, Sam Bhatta, Daniel Kwon

## Problem Statement

Students, researchers, and information-seekers often struggle with the overwhelming task of sifting through vast amounts of online content to find relevant information. There is a lack of effective tools that are embedded in the web browser that helps the users quickly understand a long and complicated web article, which makes the research daunting and less productive.


## Target Audience

Students conducting research for academic papers or projects. Researchers gathering up to date information across various fields. Educators and content creators that collect rephrased information. Anyone who frequently engages in extensive online reading and needs to compile information efficiently. 


## Description

The AI Research Assistant is a Chrome Extension powered by OpenAI API through the GPT model, designed to enhance the online research process. It offers a sidebar interface that allows users to summarize web pages or specific sections, and displays it in an organized and refined manner. 


## Selling Points

Efficient Information Processing: The extension swiftly summarizes long and complex web articles, condensing them into digestible highlights. This drastically reduces the time required for users to sift through and understand vast amounts of online content, making the research process more manageable and less overwhelming.

Tailored Summarization: It provides users with the flexibility to select specific sections of a webpage for summarization. This feature ensures that users can focus on extracting information that is most relevant to their research needs, without having to wade through unrelated content.
User-centric Design: The focus on a simple, intuitive user experience ensures that the tool is accessible to users with varying levels of technical expertise. Integrates directly into the web browser with a sidebar interface, providing a seamless tool for gathering, understanding, and organizing information without switching between apps.
Intuitive Topic Mastery: Empowers users to swiftly grasp complex topics by distilling extensive online articles into concise, digestible summaries, directly within the browser.
Enhanced Academic and Professional Output: Aids in producing high-quality academic papers, projects, and content by providing up-to-date, relevant information that is rephrased for clarity, aiding in analysis and creativity.


## User Stories

- As a student, I want to quickly summarize long academic papers or articles so that I can understand their essence without spending hours reading.

- As a learner, I want to have a more intuitive understanding of complex topics and want my questions answered through examples in the webpage interactively.

- As a journalist, I want to compare summaries of various news articles on the same event so that I can identify discrepancies or biases in reporting.

- As a content creator, I need to gather insights and facts on trending topics so that I can produce relevant and engaging content for my audience.

- As a busy professional who needs to stay updated on industry trends, I want to quickly summarize industry reports and news articles so that I can make informed decisions without spending hours reading.

- As a content creator, I need to rephrase and condense information from various sources for my blog posts to ensure originality and maintain my readers' interest.

- As a university student researching for a group project, I want to share summarized key points of articles with my team members so that we can collaborate more efficiently and stay on the same page.

- As an educator preparing lesson plans, I need to compile simplified explanations of complex subjects so that I can make the topics more accessible to my students.

- As a policy analyst, I want to summarize government reports and legal documents quickly to draft briefs and recommendations for decision-makers without overlooking essential details.

- As a developer keeping up with the latest in technology advancements, I need to digest technical documentation and research papers quickly to integrate new features into my work without getting bogged down by the volume of information.

- As a health professional looking to stay informed about medical research, I want to extract vital information from research articles swiftly to apply the latest findings to my practice and patient care.

- As a financial analyst, I need to condense market research reports and financial news into actionable insights so that I can advise clients or make investment decisions with agility.


## Notes

A potential challenge is ensuring the AI understands the context and relevance of information accurately across different fields of study. Considering privacy concerns, it's important to clarify how data (highlights) is stored and managed.. Future iterations could include features like automatic citation generation and integration with academic databases for more comprehensive research support.


## References & Inspiration

https://chromewebstore.google.com/detail/bookmark-manager-speed-di/pdcohkhhjbifkmpakaiopnllnddofbbn

https://chromewebstore.google.com/detail/maxaime-use-1-click-ai-an/mhnlakgilnojmhinhkckjpncpbhabphi

https://openai.com/pricing


## Technical Details

### User Interface

Users will interact with the AI Research Assistant Chrome Extension primarily through a sidebar interface that appears in the Chrome browser. This sidebar will display summarized content from the current webpage or selected sections. Users can activate this sidebar by clicking on an extension icon in the Chrome toolbar or by selecting text and right-clicking to choose a "Summarize this section" option from the context menu. The interface will be designed for simplicity and ease of use, ensuring users of all technical levels can navigate and utilize the features effectively.

- **Sidebar Interface:** The sidebar will display the summarized content of the current webpage or selected passages.
- **Context Menu:** An option to summarize selected text on the webpage, enhancing flexibility and user control.
- **Browser Action:** The icon in the Chrome Toolbar for toggling the sidebar and accessing (potential) extension settings.

### API, Libraries, and Frameworks

- **OpenAI API:** Utilized to generate summaries of the page’s content through ChatGPT models, providing the user quick and accurate information.
  - [OpenAI API Documentation](https://platform.openai.com/docs/introduction)
  - [API Reference](https://platform.openai.com/docs/api-reference)

- **Chrome Extensions API:** Used for integrating the sidebar, context menu, and browser action into the Chrome browser, facilitating user interaction with the extension.
  - [Chrome Extensions API](https://developer.chrome.com/docs/extensions/reference/api)


### Data Storage

We will use the Chrome Storage API to locally manage user preferences and an optional summary history. This choice ensures user data remains private and readily available, fostering a personalized and efficient user experience.

- **User Preferences:** Settings such as summarization length and style, enabling tailored summarizations.
- **Summarization History:** An optional feature for users to save and revisit summaries, including source URLs and summary content.

## Project Management

### Collaboration and Task Allocation

- **Leader:** Mars - Main decision-maker on the extension's features and overall direction in cases of different opinions. Will ensure the extension remains true to its intended purpose, directing its development with decisive leadership.
- **Manager:** Caroline - Responsible for keeping the project on track, Caroline will manage logistics, from resource allocation to task distribution, ensuring a smooth workflow.
- **Frontend Developer:** Daniel - Specializing in creating the user interface, Daniel will implement the sidebar and browser actions that make our extension interactive and user-friendly.
- **API Integration Specialist:** Sam - will focus on integrating the OpenAI API, ensuring our extension can generate and display summaries efficiently.

The team will collaborate using GitHub for code management and version control, and Slack for daily communication. Weekly meetings will be held on campus to discuss progress, challenges, and next steps.

### Risks and Mitigation

- **Risk #1:** Dependency on external APIs could lead to issues if the API becomes unavailable or changes.
  - **Risk Designation:** High
  - **Risk Severity:** Major
  - **Likelihood:** Moderate
  - **Mitigation Strategy:** Implement error handling and explore alternative APIs for backup. Keep the code modular to easily switch APIs if needed.

- **Risk #2:** Missed project milestone deadlines and deviation from the intended project schedule due to external commitments, miscalibrated expectations for the time required for project tasks, and general inefficiencies.
  - **Risk Designation:** Medium
  - **Severity:** Significant 
  - **Likelihood:** Moderate
  - **Mitigation Strategy:** Establish clear communication expectations from the beginning, set smaller, more frequent milestones, and factor in additional buffer time when creating project milestone deadlines to account for unexpected delays. Regular weekly (or more often, if needed) team meetings, clearly defined tasks, and team GCal with project planning deadlines.

- **Risk #3:** Inter-team conflicts and issues, including interpersonal conflicts that create a toxic work environment, team members not completing their designated tasks, and disagreements about the direction and implementation of the project.
  - **Risk Designation:** Medium
  - **Severity:** Significant
  - **Likelihood:** Unlikely
  - **Mitigation Strategy:** Clearly define the roles and expectations for each team member, foster a team culture of inclusivity and collaboration, and establish a process for regular check-ins and mediation of conflict.

### Milestones and Timeline

- **Week 1 (Sunday, March 31st):**
  - Task 1: Ideation and planning, Project setup
  - Task 2: Finalize features, finalize UI designs
  - Task 3: Outline project structure, start development on the sidebar interface and settings.

- **Week 2 (Sunday, April 7th):**
  - Task 4: Begin development
  - Task 5: Implement summarization feature using the OpenAI API
  - Task 6: Including content script for text selection and summarization

- **Week 3 (Sunday, April 14th):**
  - Task 7: Integrate local storage for preferences and optional summarization history
  - Task 8: Begin internal testing and UI polishing
  - Task 9: Enhance the user interface based on initial feedback, ensuring the sidebar is intuitive and the extension's overall usability is high.

- **Week 4 (Sunday, April 21st):**
  - Task 10: Rigorous testing of the summarization accuracy and user interface refinements based on test feedback
  - Task 11: Prepare for launch by creating and polishing documentation 
  - Task 12: Review and finalize all user-facing components


Adjustments and Additional Notes:

By adopting an agile project management approach, we'll maintain flexibility to adapt to feedback and unforeseen challenges, ensuring our Chrome Extension meets our high standards and user expectations at launch.
