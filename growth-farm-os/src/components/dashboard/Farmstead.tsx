import { useState } from 'react';
import { HandsClapping, PencilSimple } from '@phosphor-icons/react';
import { Card, CardTitle, Avatar, AvatarGroup, AddButton } from '../shared';
import {
  teamMembers,
  mustConquer,
  wins,
  annualGoals,
  getTeamMember,
  getTimeAgo,
} from '../../data/sampleData';
import type { TeamMember } from '../../types';

// Get greeting based on time of day
function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

// Get contextual message based on day
function getContextMessage(): string {
  const day = new Date().getDay();
  const messages: Record<number, string> = {
    0: "Rest day. Recharge for the week ahead.",
    1: "New week, new wins. Let's get it!",
    2: "Momentum building. Keep pushing.",
    3: "Midweek magic. Stay focused.",
    4: "Almost there. Finish strong.",
    5: "Friday energy. Close those loops.",
    6: "Weekend warrior mode. Or rest.",
  };
  return messages[day] || '';
}

export function Farmstead() {
  const currentUser = teamMembers[0]; // Zweli as current user for demo
  const [selectedWin, setSelectedWin] = useState<number | null>(null);

  return (
    <div className="p-4 pb-24 space-y-3">
      {/* Greeting Card */}
      <Card>
        <p className="text-lg text-soil">
          <span className="font-heading font-semibold">{getGreeting()}, </span>
          <span className="font-heading font-semibold text-balloon">{currentUser.name.split(' ')[0]}</span>
        </p>
        <p className="text-sm text-soil-muted mt-1">{getContextMessage()}</p>
      </Card>

      {/* Team Mood Board */}
      <Card>
        <CardTitle>Team Mood</CardTitle>
        <div className="flex gap-3 overflow-x-auto scrollbar-hide -mx-1 px-1 py-1">
          {teamMembers.map((member) => (
            <TeamMoodCard
              key={member.id}
              member={member}
              isCurrentUser={member.id === currentUser.id}
            />
          ))}
        </div>
      </Card>

      {/* Must Conquer */}
      <Card>
        <CardTitle
          badge={
            <span className="text-[10px] font-semibold text-soil-muted">
              {mustConquer.length}/3
            </span>
          }
        >
          Must Conquer
        </CardTitle>
        <div className="space-y-2.5">
          {mustConquer.map((item, index) => {
            const linkedGoal = item.linkedGoalId
              ? annualGoals.find((g) => g.id === item.linkedGoalId)
              : null;
            const ralliedMembers = item.ralliedMemberIds
              .map((id) => getTeamMember(id))
              .filter(Boolean) as TeamMember[];

            return (
              <div
                key={item.id}
                className="flex items-start gap-3 p-2.5 bg-canvas rounded-lg"
              >
                <div className="w-6 h-6 rounded-full bg-soil text-canvas text-xs font-semibold flex items-center justify-center flex-shrink-0">
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-soil">{item.title}</p>
                  {linkedGoal && (
                    <p className="text-[10px] text-info mt-0.5 truncate">
                      {linkedGoal.area.replace('_', ' ')}: {linkedGoal.title}
                    </p>
                  )}
                </div>
                <AvatarGroup
                  avatars={ralliedMembers.map((m) => ({
                    initials: m.initials,
                    color: m.color,
                  }))}
                  size="sm"
                />
              </div>
            );
          })}
          {mustConquer.length < 3 && (
            <AddButton label="Add priority" onClick={() => {}} />
          )}
        </div>
      </Card>

      {/* Top of Mind */}
      <Card>
        <CardTitle
          badge={
            <button className="text-soil-muted hover:text-soil transition-colors">
              <PencilSimple size={14} weight="bold" />
            </button>
          }
        >
          Top of Mind
        </CardTitle>
        <div className="bg-canvas rounded-lg p-3">
          <p className="text-sm text-soil leading-relaxed">
            Focus on closing Vodacom this week. Need to nail the presentation
            deck and address their security concerns. Also, VUT scope creep is
            becoming an issue - need to have a frank conversation with Prof.
            Molefe.
          </p>
          <p className="text-[10px] text-soil-muted mt-2">Updated today</p>
        </div>
      </Card>

      {/* Wins from Last Week */}
      <Card>
        <CardTitle>Wins from Last Week</CardTitle>
        <div className="space-y-3">
          {wins.map((win) => {
            const author = getTeamMember(win.userId);
            if (!author) return null;

            const clappers = win.clapperIds
              .map((id) => getTeamMember(id))
              .filter(Boolean) as TeamMember[];

            return (
              <div key={win.id} className="flex gap-3">
                <Avatar
                  initials={author.initials}
                  color={author.color}
                  size="md"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-soil">
                      {author.name}
                    </span>
                    <span className="text-[10px] text-soil-muted">
                      {getTimeAgo(win.createdAt)}
                    </span>
                  </div>
                  <p className="text-sm text-soil-light leading-relaxed">
                    {win.content}
                  </p>
                  <button
                    onClick={() =>
                      setSelectedWin(selectedWin === win.id ? null : win.id)
                    }
                    className="flex items-center gap-1.5 mt-2 text-xs text-soil-muted hover:text-balloon transition-colors"
                  >
                    <HandsClapping
                      size={16}
                      weight={selectedWin === win.id ? 'fill' : 'regular'}
                      className={selectedWin === win.id ? 'text-balloon' : ''}
                    />
                    <span>{win.claps}</span>
                    {clappers.length > 0 && (
                      <div className="ml-1">
                        <AvatarGroup
                          avatars={clappers.map((m) => ({
                            initials: m.initials,
                            color: m.color,
                          }))}
                          max={3}
                          size="sm"
                        />
                      </div>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
          <AddButton label="Add win" onClick={() => {}} />
        </div>
      </Card>
    </div>
  );
}

// Team Mood Card Component
interface TeamMoodCardProps {
  member: TeamMember;
  isCurrentUser: boolean;
}

function TeamMoodCard({ member, isCurrentUser }: TeamMoodCardProps) {
  return (
    <div className="flex-shrink-0 w-[100px] bg-canvas rounded-lg p-2.5 text-center relative">
      {isCurrentUser && (
        <button className="absolute top-1 right-1 p-1 text-soil-muted hover:text-soil rounded hover:bg-white transition-colors">
          <PencilSimple size={10} weight="bold" />
        </button>
      )}
      <Avatar
        initials={member.initials}
        color={member.color}
        size="md"
        mood={member.mood}
        className="mx-auto mb-1.5"
      />
      <p className="text-xs font-medium text-soil truncate">
        {member.name.split(' ')[0]}
      </p>
      <p className="text-[10px] text-soil-muted truncate">
        {member.moodText || 'No mood set'}
      </p>
    </div>
  );
}
