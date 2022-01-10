import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { OctokitModule } from '../octokit/octokit.module';
import { GITHUB_QUEUE } from '../queue';
import { GithubDiscoverByOrgPresenceService } from './discover-by-org-presence.service';
import { GithubDiscoverByOwnerSearchService } from './discover-by-owner-search.service';
import { GithubDiscoverByRepoSearchService } from './discover-by-repo-search.service';
import { GithubDiscoverCommand } from './github-discover.command';
import { GithubDiscoveryProcessor } from './github-discovery.processor';
import { GithubOwnerScheduler } from './github-owner.scheduler';
import { GithubOwnerService } from './github-owner.service';

@Module({
  imports: [BullModule.registerQueue({ name: GITHUB_QUEUE }), OctokitModule],
  providers: [
    GithubDiscoveryProcessor,
    GithubOwnerScheduler,
    GithubOwnerService,
    GithubDiscoverCommand,

    // Discoverers:
    GithubDiscoverByRepoSearchService,
    GithubDiscoverByOwnerSearchService,
    GithubDiscoverByOrgPresenceService,
  ],
  exports: [],
})
export class GithubOwnerModule {}
