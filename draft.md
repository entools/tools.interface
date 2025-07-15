```mermaid
flowchart
USER-PROFILE[Profile] --> |user_id| USER-PROJECT[Project]
USER-PROJECT --> |project_id| DOCUMENT[Document]
DOCUMENT <--> |document_id| BLOCK[Block]
BLOCK[Block] <--> |block_id| ITEM[Item]
ITEM <--> RAIN
LIBRARY[Library] --> |document_type_id| ITEM[Item]
DOCUMENT-TYPE[Document type] --> |document_type_id| DOCUMENT

USER-PROFILE[Profile] <--> |user_id| USER-SETTINGS[Settings]
USER-PROFILE[Profile] <--> |user_id| USER-ACCOUNT[Account]
USER-PROFILE[Profile] <--> |user_id| USER-TEAM[Team]
USER-PROFILE[Profile] <--> |user_id| USER-ROLE[Role]

USER-SETTINGS --> SETTINGS-DETAILS[...]
USER-ACCOUNT --> ACCOUNT-DETAILS[...]
USER-TEAM --> TEAM-DETAILS[...]
```

> - item: id, index, blockId, description, type, value
> - block: id, index, documentId, name
> - document: id, projectId, name, documentType
> - project: id, userId, name, description
> - settings: userId, sideBarSize, userTheme
> - team: id, ownerId, userId
