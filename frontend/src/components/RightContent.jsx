import React from 'react';

const RightContent = () => {
  const newsData = [
    {
      id: 1,
      title: 'Record Voter Turnout in National Elections',
      description: 'The Election Commission reported a record-breaking 72.4% turnout in the 2025 national elections, with youth participation hitting an all-time high.',
      date: '2025-04-11',
      author: 'Election Times',
      category: 'Turnout',
      imageUrl: 'https://plus.unsplash.com/premium_photo-1661718892853-96806440393b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: 2,
      title: 'Major Parties Gear Up for Final Phase of Campaign',
      description: 'As the final phase of elections approaches, major political parties intensify their campaigns with rallies across key battleground states.',
      date: '2025-04-10',
      author: 'Politics Daily',
      category: 'Campaign',
      imageUrl: 'https://images.unsplash.com/photo-1718433449771-4978672055b8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: 3,
      title: 'Election Commission Cracks Down on Misinformation',
      description: 'The EC has removed over 300 social media posts flagged for spreading fake election-related news to ensure fair voting.',
      date: '2025-04-09',
      author: 'FactWatch',
      category: 'Security',
      imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
    },
    {
      id: 4,
      title: 'Women Voters Lead in Early Ballots Cast',
      description: 'In several regions, women voters have surpassed male voter turnout during the early voting period.',
      date: '2025-04-08',
      author: 'Civic Voice',
      category: 'Voters',
      imageUrl: 'https://images.unsplash.com/photo-1505968409348-bd000797c92e?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: 5,
      title: 'AI-Powered Voting Machines Debut in Urban Centers',
      description: 'Cities like Delhi and Mumbai saw the rollout of new AI-integrated voting machines aimed at reducing errors and speeding up counting.',
      date: '2025-04-07',
      author: 'Tech & Democracy',
      category: 'Technology',
      imageUrl: 'https://plus.unsplash.com/premium_photo-1683910767532-3a25b821f7ae?q=80&w=2008&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
  ];

  return (
    <div>
      {/* Sticky Header */}
      <div className='text-center bg-red-500 p-4 m-4 sticky top-16 shadow-md z-10'>
        Hot News
      </div>

      <div className="gap-4 flex flex-col w-full h-full p-4 max-w-md mx-auto">
        {newsData.map((news) => (
          <div
            key={news.id}
            className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md transition-all duration-300 hover:shadow-xl"
          >
            <div className="overflow-hidden h-40 z-0">
              <img
                src={news.imageUrl}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
                }}
                alt={news.title}
                className="h-full w-full object-cover transform transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800 group-hover:text-red-600 transition-colors duration-300">
                {news.title}
              </h2>
              <p className="mt-1 text-gray-600 text-sm line-clamp-3 overflow-hidden max-h-16">
                {news.description}
              </p>
              <div className="mt-3 text-xs text-gray-500 flex justify-between items-center">
                <span>
                  By <span className="font-medium text-gray-700">{news.author}</span>
                </span>
                <span>
                  {new Date(news.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
              </div>
              <div className="mt-2">
                <span className="inline-block bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">
                  {news.category}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RightContent;
